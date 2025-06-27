import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type AlertType = 'success' | 'error' | 'info' | 'warning'

interface AlertState {
  title: string
  message: string
  type: AlertType
}

type TriggerState = {
  isCreateProject: boolean
  isCreateIssue: boolean
  isUpdateIssue: boolean
  isOpenDialogSkill: boolean
  alert: AlertState & {
    visible: boolean
  }
}

const initialState: TriggerState = {
  isCreateProject: false,
  isCreateIssue: false,
  isUpdateIssue: false,
  isOpenDialogSkill: false,
  alert: {
    title: '',
    message: '',
    type: 'info',
    visible: false
  }
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
    showAlert: (
      state,
      action: PayloadAction<{ title: string; message: string; type: AlertType }>
    ) => {
      state.alert.message = action.payload.message
      state.alert.type = action.payload.type
      state.alert.visible = true
    },
    hideAlert: (state) => {
      state.alert.visible = false
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
  showAlert,
  hideAlert
} = triggerSlice.actions
export default triggerSlice
