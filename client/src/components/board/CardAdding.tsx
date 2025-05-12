import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

type CardAddingProps = {
  id: string
} & React.ComponentPropsWithoutRef<typeof Card>

const CardAdding = forwardRef<HTMLDivElement, CardAddingProps>(
  ({ id, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('p-1', className)} {...props}>
        <CardContent className='p-0'>
          <form>
            <Input />
          </form>
        </CardContent>
      </Card>
    )
  }
)

export default CardAdding
