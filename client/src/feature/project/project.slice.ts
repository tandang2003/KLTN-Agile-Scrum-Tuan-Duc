import { setProjectAuthorization } from '@/configuration/http.config'
import { RootState } from '@/context/redux/store'
import { logoutThunk } from '@/feature/auth/auth.slice'
import tokenService from '@/services/token.service'
import { TokenProjectResponse } from '@/types/project.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProjectState = {
  token?: string
  projectIdsAllowed: string[]
}
const initialState: ProjectState = {
  projectIdsAllowed: []
}

const getTokenProjectThunk = createAsyncThunk<TokenProjectResponse, void>(
  'workspace/token',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const workspaceId = state.workspaceSlice.currentId
      if (!workspaceId) return rejectWithValue('Workspace Id is empty')
      const data = await tokenService.getTokenProject(workspaceId)
      setProjectAuthorization(data.data.project_authorization_token)
      return data.data
    } catch (_) {
      return rejectWithValue('You are not a part of this workspace')
    }
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {},
  // reset state
  extraReducers(builder) {
    builder.addCase(
      getTokenProjectThunk.fulfilled,
      (state: ProjectState, action: PayloadAction<TokenProjectResponse>) => {
        state.token = action.payload.project_authorization_token
        state.projectIdsAllowed = [
          ...(action.payload.project_ids ?? []),
          action.payload.project_id
        ]
      }
    )
    builder.addMatcher(
      (action) =>
        action.type === logoutThunk.rejected.type ||
        action.type === logoutThunk.fulfilled.type,
      () => initialState
    )
  }
})

const projectReducer = projectSlice.reducer
export { getTokenProjectThunk, projectReducer }
export default projectSlice
