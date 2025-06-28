import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import KanbanBoard from '@/components/kanban/KanbanBoard'
import Column from '@/components/board/Column'
import { CardModelType, ColumnModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { memo } from 'react'

type RenderColumnProps = {
  id: Id
  column: ColumnModelType
  cards: CardModelType[]
}

const RenderColumn = ({ id, column, cards }: RenderColumnProps) => {
  return (
    <SortableContext
      id={id}
      items={column.cardIds}
      strategy={verticalListSortingStrategy}
    >
      <div className='relative z-20 h-[90vh] shrink-0 basis-[350px] border'>
        <KanbanBoard id={id}>
          <Column id={id} name={column.name} items={cards} />
        </KanbanBoard>
      </div>
    </SortableContext>
  )
}

export default memo(RenderColumn)
