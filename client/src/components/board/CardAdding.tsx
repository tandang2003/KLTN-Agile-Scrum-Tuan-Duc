import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import issueService from '@/services/issue.service'
import React, { forwardRef, useRef } from 'react'
import { toast } from 'sonner'

type CardAddingProps = {
  id: string
} & React.ComponentPropsWithoutRef<typeof Card>

const CardAdding = forwardRef<HTMLDivElement, CardAddingProps>(
  ({ id, className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleClick = () => {
      if (!textareaRef.current?.value) {
        toast.warning('Please input name issue')
        return
      }

      const value = textareaRef.current.value
      // issueService.createIssue({
      //   name: value,
      //   projectId:,
      // })
    }
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
                ref={textareaRef}
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
