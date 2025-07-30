import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
type RoundedLabelProps = {
  className?: string
  label: ReactNode
  children: ReactNode
}

const RoundedLabel = ({ label, children, className }: RoundedLabelProps) => {
  return (
    <div
      className={cn('flex rounded-sm bg-gray-50 p-2 shadow-sm/20', className)}
    >
      {label}
      {children}
    </div>
  )
}

export default RoundedLabel
