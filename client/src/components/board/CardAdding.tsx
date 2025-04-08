import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  useClickHandler,
  useClickManager
} from '@/context/click/click-manager-hook'
import { cn } from '@/lib/utils'
import React from 'react'

type CardAddingProps = React.HTMLProps<HTMLDivElement> & {
  id: string
}

const CardAdding = ({ id, className }: CardAddingProps) => {
  const { activeId } = useClickManager()

  const divRef = useClickHandler(
    id,
    () => {
      console.log(`${id} Clicked inside Dropdown`)
    },
    () => {
      console.log(`${id} Clicked outside Dropdown`)
    }
  )

  return (
    <Card
      className={cn('p-1', id == activeId ? 'block' : 'hidden', className)}
      ref={divRef}
    >
      <CardContent className='p-0'>
        <form>
          <Input />
        </form>
      </CardContent>
    </Card>
  )
}

export default CardAdding
