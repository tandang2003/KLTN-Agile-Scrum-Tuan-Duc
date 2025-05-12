import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

type CardAddingProps = {
  id: string
} & React.ComponentPropsWithoutRef<typeof Card>

const CardAdding = forwardRef<HTMLDivElement, CardAddingProps>(
  ({ id, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn('border-2 border-blue-300 p-1', className)}
        {...props}
      >
        <CardContent className='p-2'>
          <form>
            <ScrollArea className='w-full'>
              <textarea
                placeholder='What needs to done?'
                className='h-[60px] w-full resize-none outline-none'
              />
              <ScrollBar orientation='vertical' />
            </ScrollArea>
            <div className='flex'>
              <Button className='ml-auto'>Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
)

export default CardAdding
