import { createSlice } from '@reduxjs/toolkit'

type TriggerState = {
  isCreateProject: boolean
  isCreateIssue: boolean
  isUpdateIssue: boolean
  isOpenDialogCourse: boolean
  isOpenDialogSkill: boolean
}

const initialState: TriggerState = {
  isCreateProject: false,
  isCreateIssue: false,
  isUpdateIssue: false,
  isOpenDialogSkill: false,
  isOpenDialogCourse: false
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
    },
    enableCreateIssue: (state: TriggerState) => {
      state.isCreateIssue = true
    },
    disableCreateIssue: (state: TriggerState) => {
      state.isCreateIssue = false
    },
    enableUpdateIssue: (state: TriggerState) => {
      state.isUpdateIssue = true
    },
    disableUpdateIssue: (state: TriggerState) => {
      state.isUpdateIssue = false
    },
    enableDialogSkill: (state: TriggerState) => {
      state.isOpenDialogSkill = true
    },
    disableDialogSkill: (state: TriggerState) => {
      state.isOpenDialogSkill = false
    },
    enableDialogCourse: (state: TriggerState) => {
      state.isOpenDialogCourse = true
    },
    disableDialogCourse: (state: TriggerState) => {
      state.isOpenDialogCourse = false
    }
  }
})

const triggerReducer = triggerSlice.reducer
export { triggerReducer }
export const {
  enableCreateProject,
  disableCreateProject,
  disableCreateIssue,
  enableCreateIssue,
  enableUpdateIssue,
  disableUpdateIssue,
  enableDialogSkill,
  disableDialogSkill,
  enableDialogCourse,
  disableDialogCourse
} = triggerSlice.actions
export default triggerSlice
