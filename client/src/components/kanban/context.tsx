import { createCtx } from '@/lib/context.helper'
import { DragEndEvent } from '@dnd-kit/core'

type KanbanContextValue = {
  onDragEnd: (event: DragEndEvent) => void
  disabled: boolean
}

const [useKanbanContext, KanbanProvider] = createCtx<KanbanContextValue>()

export { KanbanProvider }
export type { KanbanContextValue }
export default useKanbanContext
