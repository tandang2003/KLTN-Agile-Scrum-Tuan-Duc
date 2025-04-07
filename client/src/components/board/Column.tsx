import {
  BaseCardProps,
  ButtonCreateCardProps,
  ColumnProps
} from '@/components/board/type'
import Icon from '@/components/Icon'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import CardAdding from '@/components/board/CardAdding'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useEffect, useRef, useState } from 'react'
import Card from '@/components/board/Card'

const Column = ({
  id,
  name,
  items,
  container = undefined,
  index,
  isOpenCard,
  setOpenCard
}: ColumnProps &
  ButtonCreateCardProps & {
    container?: string
  }) => {
  const { setNodeRef } = useDroppable({ id })
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [heightToBottom, setHeightToBottom] = useState<number>(0)

  useEffect(() => {
    if (scrollRef.current) {
      const rect = scrollRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      setHeightToBottom(() => viewportHeight - rect.bottom)
    }
  }, [])

  return (
    <div ref={setNodeRef} className={(cn('h-fit rounded-xl p-2'), container)}>
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
      <ScrollArea
        style={{
          height: `${heightToBottom}px`
        }}
        ref={scrollRef}
      >
        <div
          style={{
            '--card': 'white'
          }}
          className='p-l4 flex flex-col gap-2 pr-4 pb-4 pl-2'
        >
          {items?.map((item: BaseCardProps) => (
            <Card key={item.id} {...item} container={cn('m-1 bg-white')} />
          ))}

          <ButtonCreateCard
            index={index}
            isOpenCard={isOpenCard}
            setOpenCard={setOpenCard}
          />
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  )
}
export default Column

const ButtonCreateCard = ({
  index,
  isOpenCard,
  setOpenCard
}: ButtonCreateCardProps) => {
  // console.log('isOpen', index, isOpenCard)
  return (
    <>
      <CardAdding
        className={cn(isOpenCard ? '!block' : '!hidden')}
        setHidden={() => {
          setOpenCard(index)
        }}
      />
      <div className='m-1 w-full bg-gray-100 pr-2'>
        <Button
          onClick={() => {
            setOpenCard(index)
          }}
          className={
            'w-full justify-start border-none bg-inherit p-1 text-black'
          }
        >
          <Icon icon='ic:baseline-plus' size={24} />
          Add Card
        </Button>
      </div>
    </>
  )
}
