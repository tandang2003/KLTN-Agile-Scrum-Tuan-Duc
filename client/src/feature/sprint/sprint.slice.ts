import { logoutThunk } from '@/feature/auth/auth.slice'
import { createSlice } from '@reduxjs/toolkit'

type SprintState = {
  isDragMode: boolean
  isOpenDialogCreate: boolean
}
const initialState: SprintState = {
  isDragMode: false,
  isOpenDialogCreate: false
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: initialState,
  reducers: {
    enableDragMode(state: SprintState) {
      state.isDragMode = true
    },
    disableDragMode(state: SprintState) {
      state.isDragMode = false
    },
    openDialogCreateSprint(state: SprintState) {
      state.isOpenDialogCreate = true
    },
    closeDialogCreateSprint(state: SprintState) {
      state.isOpenDialogCreate = false
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

const sprintReducer = sprintSlice.reducer
export { sprintReducer }
export const {
  enableDragMode,
  disableDragMode,
  openDialogCreateSprint,
  closeDialogCreateSprint
} = sprintSlice.actions
export default sprintSlice
