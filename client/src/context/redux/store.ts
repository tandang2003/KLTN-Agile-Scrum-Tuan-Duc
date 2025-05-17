import {
  localStorageMiddleware,
  persistAuthorizationMiddleware
} from '@/context/redux/middleware'
import rootReducer from '@/context/redux/reducer'
import boardApi from '@/feature/board/board.api'
import projectApi from '@/feature/project/project.api'
import sprintApi from '@/feature/sprint/sprint.api'
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
      projectIdsAllowed: tokenService.getTokenProjectSession()?.ids || []
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(persistAuthorizationMiddleware)
      .concat(boardApi.middleware)
      .concat(workspaceApi.middleware)
      .concat(projectApi.middleware)
      .concat(sprintApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
