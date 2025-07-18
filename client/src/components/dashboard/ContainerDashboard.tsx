import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'
type ContainerDashboardProps = {
  children: ReactNode
} & ComponentProps<'div'>

const ContainerDashboard = ({
  className,
  children,
  ...props
}: ContainerDashboardProps) => {
  return (
    <div
      className={cn(
        'rounded-md border-4 border-gray-300 p-2 shadow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default ContainerDashboard
