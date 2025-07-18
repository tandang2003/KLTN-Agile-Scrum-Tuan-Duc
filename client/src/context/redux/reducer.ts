import aggregateApi from '@/feature/aggregate/aggregate.api'
import authReducer from '@/feature/auth/auth.slice'
import { boardReducer } from '@/feature/board/board.slice'
import courseApi from '@/feature/course/course.api'
import dashboardApi from '@/feature/dashboard/dashboard.api'
import issueApi from '@/feature/issue/issue.api'
import { issueReducer } from '@/feature/issue/issue.slice'
import notificationApi from '@/feature/notification/notification.api'
import projectApi from '@/feature/project/project.api'
import { projectReducer } from '@/feature/project/project.slice'
import relationshipApi from '@/feature/relationship/relationship.api'
import skillApi from '@/feature/skill/skill.api'
import { skillReducer } from '@/feature/skill/skill.slice'
import sprintApi from '@/feature/sprint/sprint.api'
import { sprintReducer } from '@/feature/sprint/sprint.slice'
import { triggerReducer } from '@/feature/trigger/trigger.slice'
import userApi from '@/feature/user/user.api'
import workspaceApi from '@/feature/workspace/workspace.api'
import { workspaceReducer } from '@/feature/workspace/workspace.slice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [sprintApi.reducerPath]: sprintApi.reducer,
  [issueApi.reducerPath]: issueApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [relationshipApi.reducerPath]: relationshipApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [aggregateApi.reducerPath]: aggregateApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  authSlice: authReducer,
  workspaceSlice: workspaceReducer,
  projectSlice: projectReducer,
  sprintSlice: sprintReducer,
  triggerSlice: triggerReducer,
  issueSlice: issueReducer,
  boardSlice: boardReducer,
  skillSlice: skillReducer
})
export default rootReducer
