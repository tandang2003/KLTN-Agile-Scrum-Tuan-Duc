import SprintTemplateCard from '@/components/sprint/template/SprintTemplateCard'
import { useAppSelector } from '@/context/redux/hook'
import { sortSprintsByPosition } from '@/lib/board'

import { SprintResponse } from '@/types/sprint.type'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

type SprintTemplateRef = {
  rollback: () => void
}

type SprintTemplateProps = {
  sprints: SprintResponse[]
  onChange?: (updatedList: SprintResponse[]) => void
}
const SprintTemplate = forwardRef(
  (
    { sprints, onChange }: SprintTemplateProps,
    ref: ForwardedRef<SprintTemplateRef>
  ) => {
    const [items, setItems] = useState<SprintResponse[]>(
      sortSprintsByPosition(sprints)
    )
    const isDragMode = useAppSelector((state) => state.sprintSlice.isDragMode)

    useImperativeHandle(
      ref,
      () => ({
        rollback: () => setItems(sortSprintsByPosition(sprints))
      }),
      [sprints]
    )

    const pointerSensor = useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
    const sensors = useSensors(pointerSensor)

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      console.log('Drag End:', active, over)
      if (over?.id != null && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        setItems(newItems)
        onChange?.(newItems)
      }
    }

    return (
      <>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className='flex flex-col gap-2'>
            <SortableContext
              items={items.map((item) => item.id)}
              disabled={!isDragMode}
            >
              {items.map((item) => (
                <SprintTemplateCard
                  key={item.id}
                  id={item.id}
                  data={item}
                  isDisabled={!isDragMode}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </>
    )
  }
)
export type { SprintTemplateRef as WorkspaceTemplateRef }
export default SprintTemplate
