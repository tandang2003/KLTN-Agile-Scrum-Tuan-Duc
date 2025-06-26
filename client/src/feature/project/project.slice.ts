import { logoutThunk } from '@/feature/auth/auth.slice'
import tokenService from '@/services/token.service'
import { Id } from '@/types/other.type'
import { TokenProject } from '@/types/project.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProjectState = {
  token?: Id
  projectIds?: Id[]
  projectId?: Id
}
const initialState: ProjectState = {}

const getTokenProjectThunk = createAsyncThunk<TokenProject, Id>(
  'workspace/token',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const data = (await tokenService.getTokenProject(workspaceId)).data
      return {
        token: data.project_authorization_token,
        projectIds: data.project_ids,
        projectId: data.project_id,
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
    setProjectCurrent: (state: ProjectState, action: PayloadAction<Id>) => {
      state.projectId = action.payload
    },
    setProjectState: (
      state: ProjectState,
      action: PayloadAction<ProjectState>
    ) => {
      state.token = action.payload.token
      state.projectIds = action.payload.projectIds
      state.projectId = action.payload.projectId
    }
  },
  // reset state
  extraReducers(builder) {
    builder.addCase(
      getTokenProjectThunk.fulfilled,
      (state: ProjectState, action: PayloadAction<TokenProject>) => {
        state.token = action.payload.token
        state.projectIds = action.payload.projectIds
        state.projectId = action.payload.projectId
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
export const { setProjectState, setProjectCurrent } = projectSlice.actions
export default projectSlice
