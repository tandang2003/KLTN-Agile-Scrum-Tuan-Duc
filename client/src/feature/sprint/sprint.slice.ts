import { logoutThunk } from '@/feature/auth/auth.slice'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id: Id
  start: string
  end: string
}

type SprintState = {
  isOpenDialogCreate: boolean
  active?: Sprint
  mode: 'create' | 'update'
  previous?: Sprint
  current?: Sprint
  next?: Sprint
}
const initialState: SprintState = {
  isOpenDialogCreate: false,
  mode: 'create'
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: initialState,
  reducers: {
    setSprintActive(
      state: SprintState,
      action: PayloadAction<Sprint | undefined>
    ) {
      state.active = action.payload
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
    },
    setSprintCurrent: (
      state: SprintState,
      action: PayloadAction<{
        current?: Sprint
        previous?: Sprint
        next?: Sprint
      }>
    ) => {
      state.current = action.payload.current
      state.previous = action.payload.previous
      state.next = action.payload.next
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
export type { Sprint as SprintCurrent }
export const {
  openDialogCreateSprint,
  closeDialogCreateSprint,
  setSprintActive,
  setSprintCurrent,
  openDialogUpdateSprint
} = sprintSlice.actions
export default sprintSlice
