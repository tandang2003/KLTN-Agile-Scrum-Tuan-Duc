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
import { cn } from '@/lib/utils'
import { createContext, useCallback, useContext, useState } from 'react'

interface AlertState {
  title?: string
  message?: string
  type?: AlertType
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}

type AlertType = 'success' | 'error' | 'info' | 'warning'

type AlertHostContextType = {
  showAlert: (data: AlertState) => void
  hideAlert: () => void
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

  const showAlert = useCallback((data: AlertState) => {
    setOpen(true)
    setDialogProps(data)
  }, [])

  const hideAlert = useCallback(() => {
    setOpen(false)
    setDialogProps(null)
  }, [])
  return (
    <AlertHostContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AlertDialog open={open} onOpenChange={() => hideAlert()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogProps?.title ?? ''}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogProps?.message ?? ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                dialogProps?.onCancel?.()
                hideAlert()
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                dialogProps?.type === 'success' && 'bg-green-500 text-white',
                dialogProps?.type === 'error' && 'bg-red-500 text-white',
                dialogProps?.type === 'info' && 'bg-blue-500 text-white',
                dialogProps?.type === 'warning' &&
                  'hover-opacity bg-yellow-500 text-white'
              )}
              onClick={() => {
                dialogProps?.onConfirm?.().finally(() => {
                  hideAlert()
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
