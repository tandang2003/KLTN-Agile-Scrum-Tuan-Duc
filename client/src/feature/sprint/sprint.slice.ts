import { logoutThunk } from '@/feature/auth/auth.slice'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SprintCurrent = {
  id: Id
  start: string
  end: string
}

type SprintState = {
  isOpenDialogCreate: boolean
  current?: SprintCurrent
  mode: 'create' | 'update'
}
const initialState: SprintState = {
  isOpenDialogCreate: false,
  mode: 'create'
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

    openDialogCreateSprint(state: SprintState) {
      state.isOpenDialogCreate = true
      state.mode = 'create'
    },
    openDialogUpdateSprint(state: SprintState) {
      state.isOpenDialogCreate = true
      state.mode = 'update'
    },
    closeDialogCreateSprint(state: SprintState) {
      state.isOpenDialogCreate = false
      state.mode = 'create'
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
export type { SprintCurrent }
export const {
  openDialogCreateSprint,
  closeDialogCreateSprint,
  setCurrentSprint,
  openDialogUpdateSprint
} = sprintSlice.actions
export default sprintSlice
