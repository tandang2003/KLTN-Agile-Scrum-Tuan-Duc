import { logoutThunk } from '@/feature/auth/auth.slice'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorkspaceState = {
  isDialogCreateOpen: boolean
  isFetching: boolean
  isFetched: boolean
  listItemSideBar: Pick<WorkSpaceModel, 'id' | 'name'>[]
}
const initialState: WorkspaceState = {
  isDialogCreateOpen: false,
  listItemSideBar: [],
  isFetching: false,
  isFetched: false
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
    setStateDialogWorkspace(
      state: WorkspaceState,
      action: PayloadAction<boolean>
    ) {
      state.isDialogCreateOpen = action.payload
    },
    addWorkspaceItems(
      state: WorkspaceState,
      action: PayloadAction<{
        items: Pick<WorkSpaceModel, 'id' | 'name'>[]
        from: number
      }>
    ) {
      const { items, from } = action.payload
      const stop = from + items.length
      let index = 0
      for (let i = from; i <= stop; i++) {
        state.listItemSideBar[i] = items[index]
        index++
      }
    }
  },
  // reset state
  extraReducers(builder) {
    builder.addMatcher(
      (action) =>
        action.type === logoutThunk.rejected.type ||
        action.type === logoutThunk.fulfilled.type,
      () => initialState
    )
  }
})

export const { setStateDialogWorkspace, addWorkspaceItems } =
  workspaceSlice.actions
export const workspaceReducer = workspaceSlice.reducer
export default workspaceSlice
