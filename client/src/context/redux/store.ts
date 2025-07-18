import {
  localStorageMiddleware,
  persistAuthorizationMiddleware,
  sprintActiveMiddleware
} from '@/context/redux/middleware'
import rootReducer from '@/context/redux/reducer'
import aggregateApi from '@/feature/aggregate/aggregate.api'
import courseApi from '@/feature/course/course.api'
import dashboardApi from '@/feature/dashboard/dashboard.api'
import issueApi from '@/feature/issue/issue.api'
import notificationApi from '@/feature/notification/notification.api'
import projectApi from '@/feature/project/project.api'
import relationshipApi from '@/feature/relationship/relationship.api'
import skillApi from '@/feature/skill/skill.api'
import sprintApi from '@/feature/sprint/sprint.api'
import userApi from '@/feature/user/user.api'
import workspaceApi from '@/feature/workspace/workspace.api'
import tokenService from '@/services/token.service'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    authSlice: {
      accessToken: tokenService.restoreTokenLocal(),
      loading: false
    },
    projectSlice: {
      token: tokenService.getTokenProjectSession()?.token || undefined,
      projectIds: tokenService.getTokenProjectSession()?.projectIds || [],
      projectId: tokenService.getTokenProjectSession()?.projectId
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(persistAuthorizationMiddleware)
      .concat(sprintActiveMiddleware)
      .concat(workspaceApi.middleware)
      .concat(projectApi.middleware)
      .concat(sprintApi.middleware)
      .concat(issueApi.middleware)
      .concat(skillApi.middleware)
      .concat(userApi.middleware)
      .concat(relationshipApi.middleware)
      .concat(notificationApi.middleware)
      .concat(courseApi.middleware)
      .concat(aggregateApi.middleware)
      .concat(dashboardApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
