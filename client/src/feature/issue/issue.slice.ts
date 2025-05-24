import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IssueCurrent = {
  id: Id
}

type IssueState = {
  current?: IssueCurrent
}
const initialState: IssueState = {}

const issueSlice = createSlice({
  name: 'issueSlice',
  initialState: initialState,
  reducers: {
    setCurrentIssue(state: IssueState, action: PayloadAction<Id>) {
      state.current = {
        id: action.payload
      }
    }
  }
})
const issueReducer = issueSlice.reducer
export { issueReducer }
export const { setCurrentIssue } = issueSlice.actions
export default issueSlice
