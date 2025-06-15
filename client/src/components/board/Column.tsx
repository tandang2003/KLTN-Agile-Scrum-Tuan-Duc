import KanbanCard from '@/components/kanban/KanbanCard'
import KanbanCards from '@/components/kanban/KanbanCards'
import KanbanHeader from '@/components/kanban/KanbanHeader'
import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentIssue } from '@/feature/issue/issue.slice'
import { enableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { memo } from 'react'

type ColumnProps = {
  id: Id
  name: string
  items: CardModelType[]
}

const Column = ({ name, items }: ColumnProps) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <KanbanHeader name={name} length={items.length} />
      <KanbanCards>
        {items.map((item) => {
          return (
            <KanbanCard
              key={item.id}
              data={{ ...item }}
              container={cn('mt-2 bg-white')}
              onClick={() => {
                dispatch(setCurrentIssue(item.id))
                dispatch(enableUpdateIssue())
              }}
            />
          )
        })}
      </KanbanCards>
    </>
  )
}
export default memo(Column)
