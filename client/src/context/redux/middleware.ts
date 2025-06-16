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
      const {
        projectId: project_id,
        projectIds: project_ids,
        token
      } = action.payload
      tokenService.setTokenProjectSession({
        token,
        projectId: project_id,
        projectIds: project_ids
      })
    }

    if (setProjectState.match(action)) {
      const { projectId, projectIds, token } = (store.getState() as RootState)
        .projectSlice

      if (token)
        tokenService.setTokenProjectSession({
          token,
          projectId,
          projectIds
        })
    }

    return next(action)
  }

const persistAuthorizationMiddleware: Middleware<{}, RootState> =
  (_) => (next) => (action) => {
    if (getTokenProjectThunk.fulfilled.match(action)) {
      const { token, projectId, projectIds } = action.payload
      tokenService.setTokenProjectSession({
        token,
        projectId,
        projectIds
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
