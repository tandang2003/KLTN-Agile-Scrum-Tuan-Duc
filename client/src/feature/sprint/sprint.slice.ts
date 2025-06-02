import { logoutThunk } from '@/feature/auth/auth.slice'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SprintCurrent = {
  id: Id
  start: string
  end: string
}

type SprintState = {
  isDragMode: boolean
  isOpenDialogCreate: boolean
  current?: SprintCurrent
}
const initialState: SprintState = {
  isDragMode: false,
  isOpenDialogCreate: false
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: initialState,
  reducers: {
    setCurrentSprint(
      state: SprintState,
      action: PayloadAction<SprintCurrent | undefined>
    ) {
      state.current = action.payload
    },
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
  closeDialogCreateSprint,
  setCurrentSprint
} = sprintSlice.actions
export default sprintSlice
