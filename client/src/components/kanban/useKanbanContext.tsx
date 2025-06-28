import { DragEndEvent } from '@dnd-kit/core'
import { createContext, useContext } from 'react'

type KanbanContextValue = {
  onDragEnd: (event: DragEndEvent) => void
  disabled: boolean
}

const KanbanContext = createContext<KanbanContextValue | undefined>(undefined)

const useKanbanContext = () => {
  const context = useContext(KanbanContext)
  if (!context) {
    throw new Error('useKanbanContext must be used within a KanbanProvider')
  }
  return context
}
export { KanbanContext }
export default useKanbanContext
