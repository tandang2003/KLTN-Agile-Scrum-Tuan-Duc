import Icon from '@/components/Icon'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import Card from '@/components/board/Card'
import CardAdding from '@/components/board/CardAdding'
import { useClickManager } from '@/context/click/click-manager-hook'
import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { useDroppable } from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'

type ColumnProps = {
  id: Id
  name: string
  items: CardModelType[]
  container?: string
}

const Column = ({ id, name, items, container }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id })
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        console.log('outside')
        setIsAdding(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [isAdding])

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        // columnRef.current = node
      }}
      className={(cn('h-fit rounded-xl p-2 py-2'), container)}
    >
      <span className='mb-3.5 flex items-center border-b-1 pb-3.5'>
        <Icon
          className='text-purple-700'
          icon={'icon-park-outline:dot'}
          size={20}
        />
        <span className='title px-1.5'>{name}</span>
        <span className='text-sm font-bold text-gray-500'>3</span>
        <Button variant={'ghost'} className='ml-auto p-0'>
          <Icon size={25} icon={'material-symbols:add-rounded'} />
        </Button>
      </span>
      <ScrollArea>
        <div className='flex flex-col pr-4 pb-4 pl-2'>
          {items?.map((item: CardModelType) => {
            return (
              <Card
                key={item.id}
                data={{ ...item }}
                container={cn('m-1 bg-white')}
              />
            )
          })}

          {isAdding ? (
            <CardAdding id={id} ref={cardRef} />
          ) : (
            <Button
              onClick={() => {
                setIsAdding(true)
                console.log(cardRef.current)
              }}
              className={
                'w-full justify-start border-none bg-inherit p-1 text-black'
              }
            >
              <Icon icon='ic:baseline-plus' size={24} />
              Add Card
            </Button>
          )}

          <div className='m-1 w-full bg-gray-100 pr-2'></div>
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  )
}
export default Column
