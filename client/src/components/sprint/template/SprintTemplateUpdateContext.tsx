import { createCtx } from '@/lib/context.helper'
import { SprintModel } from '@/types/model/sprint.model'

type ContextValue = {
  sprint: SprintModel
  setSprintModel: (sprint: SprintModel) => void
}

const [useSprint, SprintProvider] = createCtx<ContextValue>()
