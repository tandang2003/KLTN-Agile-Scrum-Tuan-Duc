import { createCtx } from '@/lib/context.helper'
import { Id } from '@/types/other.type'

type ProjectDashBoardContextType = {
  sprint: {
    id?: Id
  }
  setSprint: (sprint: { id?: Id }) => void
}

const [useProjectDashBoard, ProjectDashBoardProvider] =
  createCtx<ProjectDashBoardContextType>()
export { useProjectDashBoard, ProjectDashBoardProvider }
