import SprintCard from '@/components/card/SprintCard'
import { useAppSelector } from '@/context/redux/hook'

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

type WorkspaceTemplateRef = {
  rollback: () => void
}

type WorkspaceTemplateProps = {
  sprints: SprintResponse[]
  onChange?: (item: SprintResponse, position: number) => void
}
const WorkspaceTemplate = forwardRef(
  (
    { sprints, onChange }: WorkspaceTemplateProps,
    ref: ForwardedRef<WorkspaceTemplateRef>
  ) => {
    const [items, setItems] = useState<SprintResponse[]>(sprints)
    const isDragMode = useAppSelector((state) => state.sprintSlice.isDragMode)
    useImperativeHandle(
      ref,
      () => ({
        rollback: () => setItems(sprints)
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

      if (over?.id != null && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        setItems((prev) => arrayMove(prev, oldIndex, newIndex))
        onChange?.(items[oldIndex], newIndex)
      }
    }

    return (
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
              <SprintCard
                key={item.id}
                id={item.id}
                data={item}
                isDisabled={!isDragMode}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    )
  }
)
export type { WorkspaceTemplateRef }
export default WorkspaceTemplate
