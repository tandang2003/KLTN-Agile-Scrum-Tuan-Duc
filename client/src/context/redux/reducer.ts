import authReducer from '@/feature/auth/auth.slice'
import boardApi from '@/feature/board/board.api'
import issueApi from '@/feature/issue/issue.api'
import issueSlice from '@/feature/issue/issue.slice'
import projectApi from '@/feature/project/project.api'
import { projectReducer } from '@/feature/project/project.slice'
import sprintApi from '@/feature/sprint/sprint.api'
import { sprintReducer } from '@/feature/sprint/sprint.slice'
import { triggerReducer } from '@/feature/trigger/trigger.slice'
import workspaceApi from '@/feature/workspace/workspace.api'
import { workspaceReducer } from '@/feature/workspace/workspace.slice'
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({
  [boardApi.reducerPath]: boardApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [sprintApi.reducerPath]: sprintApi.reducer,
  [issueApi.reducerPath]: issueApi.reducer,
  [issueSlice.reducerPath]: issueSlice.reducer,
  authSlice: authReducer,
  workspaceSlice: workspaceReducer,
  projectSlice: projectReducer,
  sprintSlice: sprintReducer,
  triggerSlice: triggerReducer
})
export default rootReducer
