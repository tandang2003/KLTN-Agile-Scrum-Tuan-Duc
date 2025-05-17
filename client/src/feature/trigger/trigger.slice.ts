import { createSlice } from '@reduxjs/toolkit'

type TriggerState = {
  isCreateProject: boolean
}

const initialState: TriggerState = {
  isCreateProject: false
}

const triggerSlice = createSlice({
  name: 'triggerSlice',
  initialState: initialState,
  reducers: {
    enableCreateProject: (state: TriggerState) => {
      state.isCreateProject = true
    },
    disableCreateProject: (state: TriggerState) => {
      state.isCreateProject = false
    }
  }
})

const triggerReducer = triggerSlice.reducer
export { triggerReducer }
export const { enableCreateProject, disableCreateProject } =
  triggerSlice.actions
export default triggerSlice
