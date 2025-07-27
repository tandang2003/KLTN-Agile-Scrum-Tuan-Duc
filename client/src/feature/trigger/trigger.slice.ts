import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TriggerState = {
  isCreateProject: boolean
  isViewIssue: boolean
  isCreateIssue: boolean
  isUpdateIssue: boolean
  isOpenDialogCourse: boolean
  isOpenDialogSkill: boolean
  isSprintUpdateTime: {
    projectId: Id
    sprintId: Id
    start: string
    end: string
  } | null
  isNotify: boolean
}

const initialState: TriggerState = {
  isCreateProject: false,
  isViewIssue: false,
  isCreateIssue: false,
  isUpdateIssue: false,
  isOpenDialogSkill: false,
  isOpenDialogCourse: false,
  isSprintUpdateTime: null,
  isNotify: false
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
    enableViewIssue: (state: TriggerState) => {
      state.isViewIssue = true
    },
    disableViewIssue: (state: TriggerState) => {
      state.isViewIssue = false
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
    },
    enableSprintUpdateTime: (
      state: TriggerState,
      action: PayloadAction<{
        projectId: Id
        sprintId: Id
        start: string
        end: string
      }>
    ) => {
      state.isSprintUpdateTime = action.payload
    },
    disableSprintUpdateTime: (state: TriggerState) => {
      state.isSprintUpdateTime = null
    },
    enableNotification: (state: TriggerState) => {
      state.isNotify = true
    },
    disableNotification: (state: TriggerState) => {
      state.isNotify = false
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
  disableDialogCourse,
  disableSprintUpdateTime,
  enableSprintUpdateTime,
  enableNotification,
  disableNotification,
  enableViewIssue,
  disableViewIssue
} = triggerSlice.actions
export default triggerSlice
