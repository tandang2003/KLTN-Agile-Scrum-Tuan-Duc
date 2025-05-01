import { Dialog } from '@/components/ui/dialog'
import { ReactNode } from 'react'

type DialogControllerProps = {
  open: boolean
  onOpen: (open: boolean) => void
  children?: ReactNode
}
const DialogController = ({
  open,
  onOpen,
  children
}: DialogControllerProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      {children}
    </Dialog>
  )
}
export type { DialogControllerProps }
export default DialogController
