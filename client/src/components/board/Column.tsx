import Icon from '@/components/Icon'

import { Button } from '@/components/ui/button'

import Card from '@/components/board/Card'
import CardAdding from '@/components/board/CardAdding'
import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { useDroppable } from '@dnd-kit/core'
import { memo, useEffect, useRef, useState } from 'react'
import ListView from '@/components/ListView'
import { useAppDispatch } from '@/context/redux/hook'
import { enableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { setCurrentIssue } from '@/feature/issue/issue.slice'

type ColumnProps = {
  id: Id
  name: string
  items: CardModelType[]
}

const Column = ({ id, name, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id })
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsAdding(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [isAdding])

  return (
    <>
      <span className='sticky top-0 z-10 flex items-center border-b-2 bg-white px-2 py-3.5'>
        <span className='title h3 px-1.5'>{name}</span>
        <span className='ml-auto text-sm font-bold text-gray-500'>
          {items.length}
        </span>
      </span>
      <div ref={setNodeRef} className={cn('min-h-[100px] rounded-sm px-2')}>
        <ListView<CardModelType>
          emptyComponent={''}
          data={items}
          className='flex flex-col'
          render={(item) => {
            return (
              <Card
                key={item.id}
                data={{ ...item }}
                container={cn('mt-2 bg-white')}
                onClick={() => {
                  dispatch(setCurrentIssue(item.id))
                  dispatch(enableUpdateIssue())
                }}
              />
            )
          }}
        />
        {isAdding ? (
          <CardAdding id={id} ref={cardRef} />
        ) : (
          <Button
            onClick={() => {
              setIsAdding(true)
            }}
            className={
              'mt-2 w-full justify-start border-none bg-inherit p-1 text-black hover:text-white'
            }
          >
            <Icon icon='ic:baseline-plus' size={24} />
            Add Card
          </Button>
        )}
      </div>
    </>
  )
}
export default memo(Column)
