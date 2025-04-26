import authReducer from '@/feature/auth/auth.slice'
import boardApi from '@/feature/board/board.api'
import workspaceApi from '@/feature/workspace/workspace.api'
import { workspaceReducer } from '@/feature/workspace/workspace.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    authSlice: authReducer,
    workspaceSlice: workspaceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(workspaceApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
