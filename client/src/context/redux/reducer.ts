import authReducer from '@/feature/auth/auth.slice'
import boardApi from '@/feature/board/board.api'
import projectApi from '@/feature/project/project.api'
import { projectReducer } from '@/feature/project/project.slice'
import sprintApi from '@/feature/sprint/sprint.api'
import { sprintReducer } from '@/feature/sprint/sprint.slice'
import workspaceApi from '@/feature/workspace/workspace.api'
import { workspaceReducer } from '@/feature/workspace/workspace.slice'
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({
  [boardApi.reducerPath]: boardApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [sprintApi.reducerPath]: sprintApi.reducer,
  authSlice: authReducer,
  workspaceSlice: workspaceReducer,
  projectSlice: projectReducer,
  sprintSlice: sprintReducer
})
export default rootReducer
