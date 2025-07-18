import KanbanBoard from '@/components/kanban/KanbanBoard'
import KanbanCard from '@/components/kanban/KanbanCard'
import KanbanCards from '@/components/kanban/KanbanCards'
import KanbanHeader from '@/components/kanban/KanbanHeader'
import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentIssue } from '@/feature/issue/issue.slice'
import { enableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { cn } from '@/lib/utils'
import { CardModelType, ColumnModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { memo } from 'react'

type RenderColumnProps = {
  id: Id
  column: ColumnModelType
  cards: CardModelType[]
}

const RenderColumn = ({ id, column, cards }: RenderColumnProps) => {
  const dispatch = useAppDispatch()
  return (
    <SortableContext
      id={id}
      items={column.cardIds}
      strategy={verticalListSortingStrategy}
    >
      <div className='relative z-20 h-[90vh] shrink-0 basis-[350px] border'>
        <KanbanHeader name={column.name} length={cards.length} />
        <KanbanBoard id={id}>
          <KanbanCards>
            {cards.map((item) => {
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
        </KanbanBoard>
      </div>
    </SortableContext>
  )
}

export default memo(RenderColumn)
