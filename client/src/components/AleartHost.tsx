import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { createContext, useCallback, useContext, useState } from 'react'

interface AlertState {
  title?: string
  message?: string
  type?: AlertType
  onConfirm?: () => Promise<void>
}

type AlertType = 'success' | 'error' | 'info' | 'warning'

type AlertHostContextType = {
  showDialog: (data: AlertState) => void
  hideDialog: () => void
}

const AlertHostContext = createContext<AlertHostContextType | null>(null)

const useAlertHost = () => {
  const context = useContext(AlertHostContext)
  if (!context) {
    throw new Error('useAlertHost must be used within an AlertHostProvider')
  }
  return context
}

type AlertHostProps = {
  children: React.ReactNode
}

const AlertHostProvider = ({ children }: AlertHostProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [dialogProps, setDialogProps] = useState<AlertState | null>(null)

  const showDialog = useCallback((data: AlertState) => {
    setOpen(true)
    setDialogProps(data)
  }, [])

  const hideDialog = useCallback(() => {
    setOpen(false)
    setDialogProps(null)
  }, [])

  return (
    <AlertHostContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <AlertDialog open={open} onOpenChange={() => hideDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogProps?.title ?? ''}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogProps?.message ?? ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dialogProps?.onConfirm?.().finally(() => {
                  hideDialog()
                })
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertHostContext.Provider>
  )
}

export default AlertHostProvider
export { useAlertHost }
