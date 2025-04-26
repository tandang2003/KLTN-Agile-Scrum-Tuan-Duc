import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorkspaceState = {
  isDialogCreateOpen: boolean
}
const initialState: WorkspaceState = {
  isDialogCreateOpen: false
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
    }
  }
})

export const { setStateDialogWorkspace } = workspaceSlice.actions
export const workspaceReducer = workspaceSlice.reducer
export default workspaceSlice
