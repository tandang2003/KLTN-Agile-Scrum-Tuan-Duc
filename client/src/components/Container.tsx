import { cn } from '@/lib/utils'
import { ReactNode, ElementType } from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  children: ReactNode
} & React.ComponentPropsWithoutRef<T>

const Container = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) => {
  const Component = as || 'div'
  return (
    <Component className={cn(className, 'container')} {...props}>
      {children}
    </Component>
  )
}

export default Container
