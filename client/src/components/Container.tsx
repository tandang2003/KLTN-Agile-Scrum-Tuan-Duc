import { cn } from '@/lib/utils'
import { ReactNode, ElementType } from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  children: ReactNode
  inSidebar?: boolean
} & React.ComponentPropsWithoutRef<T>

const Container = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  inSidebar = false,
  ...props
}: ContainerProps<T>) => {
  const Component = as || 'div'
  return (
    <Component
      className={cn(className, inSidebar ? 'container-sidebar' : 'container')}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
