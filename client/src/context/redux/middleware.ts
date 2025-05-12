import { RootState } from '@/context/redux/store'
import { logoutThunk } from '@/feature/auth/auth.slice'
import {
  getTokenProjectThunk,
  setProjectState
} from '@/feature/project/project.slice'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import tokenService from '@/services/token.service'
import { Middleware } from '@reduxjs/toolkit'

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (setCurrentWorkspaceId.match(action)) {
      const payload = action.payload
      tokenService.setWorkspaceLatest(payload)
    }
    if (getTokenProjectThunk.fulfilled.match(action)) {
      const { ids, token } = action.payload
      tokenService.setTokenProjectSession({
        token,
        ids
      })
    }

    if (setProjectState.match(action)) {
      const token = (store.getState() as RootState).projectSlice.token || ''
      const ids =
        (store.getState() as RootState).projectSlice.projectIdsAllowed || ''
      tokenService.setTokenProjectSession({
        token,
        ids
      })
    }
    return next(action)
  }

const persistAuthorizationMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (getTokenProjectThunk.fulfilled.match(action)) {
      const { token, ids } = action.payload
      tokenService.setTokenProjectSession({
        ids,
        token
      })
    }

    if (
      logoutThunk.fulfilled.match(action) ||
      logoutThunk.rejected.match(action)
    ) {
      tokenService.clear()
    }
    return next(action)
  }
export { localStorageMiddleware, persistAuthorizationMiddleware }
