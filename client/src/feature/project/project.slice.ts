import { logoutThunk } from '@/feature/auth/auth.slice'
import tokenService from '@/services/token.service'
import { Id } from '@/types/other.type'
import { TokenProject } from '@/types/project.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProjectState = {
  token?: Id
  projectIdsAllowed: Id[]
}
const initialState: ProjectState = {
  projectIdsAllowed: []
}

const getTokenProjectThunk = createAsyncThunk<TokenProject, Id>(
  'workspace/token',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const data = (await tokenService.getTokenProject(workspaceId)).data
      return {
        token: data.project_authorization_token,
        ids: [...(data.project_ids || []), data.project_id].filter(
          (id): id is string => typeof id === 'string' && id.trim() != ''
        ),
        workspaceId: workspaceId
      }
    } catch (_) {
      return rejectWithValue('You are not a part of this workspace')
    }
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setProjectState: (
      state: ProjectState,
      action: PayloadAction<ProjectState>
    ) => {
      state = action.payload
    }
  },
  // reset state
  extraReducers(builder) {
    builder.addCase(
      getTokenProjectThunk.fulfilled,
      (state: ProjectState, action: PayloadAction<TokenProject>) => {
        state.token = action.payload.token
        state.projectIdsAllowed = action.payload.ids
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
export const { setProjectState } = projectSlice.actions
export default projectSlice
