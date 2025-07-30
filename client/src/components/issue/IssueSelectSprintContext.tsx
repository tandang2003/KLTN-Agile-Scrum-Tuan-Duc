import { createCtx } from '@/lib/context.helper'
import { Id } from '@/types/other.type'
import { ReactNode, useState } from 'react'

type SprintSelect = {
  id: Id
  start: Date
  end: Date
}

type SprintSelectValue = {
  sprint: SprintSelect | null
  setSprint: (value: SprintSelect | null) => void
}

const [useSprintSelect, SprintSelectContext] = createCtx<SprintSelectValue>()

const SprintSelectProvider = ({ children }: { children: ReactNode }) => {
  const [sprint, setSprint] = useState<SprintSelect | null>(null)
  return (
    <SprintSelectContext
      value={{
        sprint: sprint,
        setSprint: setSprint
      }}
    >
      {children}
    </SprintSelectContext>
  )
}
export { SprintSelectProvider, useSprintSelect }
