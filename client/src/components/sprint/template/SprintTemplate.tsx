import SprintTemplateCard from '@/components/sprint/template/SprintTemplateCard'
import { sortSprintsByDateStart } from '@/lib/board'

import { SprintResponse } from '@/types/sprint.type'

import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

type SprintTemplateRef = {
  rollback: () => void
}

type SprintTemplateProps = {
  sprints: SprintResponse[]
}
const SprintTemplate = forwardRef(
  ({ sprints }: SprintTemplateProps, ref: ForwardedRef<SprintTemplateRef>) => {
    const [items, setItems] = useState<SprintResponse[]>(
      sortSprintsByDateStart(sprints)
    )

    useImperativeHandle(
      ref,
      () => ({
        rollback: () => setItems(sortSprintsByDateStart(sprints))
      }),
      [sprints]
    )

    return (
      <>
        <div className='flex flex-col gap-4'>
          {items.map((item) => (
            <SprintTemplateCard key={item.id} id={item.id} data={item} />
          ))}
        </div>
      </>
    )
  }
)
export type { SprintTemplateRef as WorkspaceTemplateRef }
export default SprintTemplate
