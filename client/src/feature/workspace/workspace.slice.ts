import { setUser } from '@/feature/auth/auth.slice'
import userService from '@/services/user.service'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { WorkspaceSideBar } from '@/types/workspace.type'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit'

type WorkspaceState = {
  isDialogCreateOpen: boolean
  isFetching: boolean
  isFetched: boolean
  listItemSideBar?: Pick<WorkSpaceModel, 'id' | 'name'>[]
}
const initialState: WorkspaceState = {
  isDialogCreateOpen: false,
  listItemSideBar: undefined,
  isFetching: false,
  isFetched: false
}

const getUserWorkspaceThunk = createAsyncThunk<WorkspaceSideBar[], void>(
  'workspace/user',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await userService.getWorkspaces()
      const { id, name, role, uniId } = data.data
      dispatch(
        setUser({
          id,
          name,
          role,
          uniId
        })
      )
      return data.data.workspaces.items
    } catch (_) {
      return rejectWithValue('Get user workspace failed')
    }
  }
)

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
    setStateDialogWorkspace(
      state: WorkspaceState,
      action: PayloadAction<boolean>
    ) {
      state.isDialogCreateOpen = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserWorkspaceThunk.fulfilled,
      (state: WorkspaceState, action: PayloadAction<WorkspaceSideBar[]>) => {
        state.listItemSideBar = action.payload.map((item) => ({
          id: item.id,
          name: item.name
        }))
      }
    )
    builder.addMatcher(isPending, (state) => {
      state.isFetching = true
    })
    builder.addMatcher(isRejected, (state) => {
      state.isFetching = false
      state.isFetched = true
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.isFetching = false
      state.isFetched = true
    })
  }
})

export { getUserWorkspaceThunk }
export const { setStateDialogWorkspace } = workspaceSlice.actions
export const workspaceReducer = workspaceSlice.reducer
export default workspaceSlice
