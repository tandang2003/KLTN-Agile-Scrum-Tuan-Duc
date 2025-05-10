import authReducer from '@/feature/auth/auth.slice'
import boardApi from '@/feature/board/board.api'
import projectApi from '@/feature/project/project.api'
import { projectReducer } from '@/feature/project/project.slice'
import sprintApi from '@/feature/sprint/sprint.api'
import { sprintReducer } from '@/feature/sprint/sprint.slice'
import workspaceApi from '@/feature/workspace/workspace.api'
import { workspaceReducer } from '@/feature/workspace/workspace.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [sprintApi.reducerPath]: sprintApi.reducer,
    authSlice: authReducer,
    workspaceSlice: workspaceReducer,
    projectSlice: projectReducer,
    sprintSlice: sprintReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(workspaceApi.middleware)
      .concat(projectApi.middleware)
      .concat(sprintApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
