import { Dialog } from '@/components/ui/dialog'
import { ComponentPropsWithRef, ReactNode } from 'react'

type DialogControllerProps = {
  open: boolean
  onOpen: (open: boolean) => void
  children?: ReactNode
} & ComponentPropsWithRef<typeof Dialog>
const DialogController = ({
  open,
  onOpen,
  children,
  ...props
}: DialogControllerProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpen} {...props}>
      {children}
    </Dialog>
  )
}
export type { DialogControllerProps }
export default DialogController
