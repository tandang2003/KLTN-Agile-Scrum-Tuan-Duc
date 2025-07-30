import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
type EmptyProps = ComponentProps<'div'>

const Empty = ({ className, children, ...props }: EmptyProps) => {
  return (
    <div
      className={cn(
        'grid h-[100px] place-items-center rounded-md bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Empty
