import { IssueResponse } from '@/types/issue.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id: string
  start: string
  end: string
}

type BoardState = {
  isLoading: boolean
  items?: IssueResponse[]
  sprints?: Sprint[]
}
const initialState: BoardState = {
  isLoading: true
}

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: initialState,
  reducers: {
    saveIssues: (state: BoardState, action: PayloadAction<IssueResponse[]>) => {
      state.items = action.payload
      state.isLoading = false
    },
    saveSprint: (state: BoardState, action: PayloadAction<Sprint[]>) => {
      state.sprints = action.payload
    }
  }
})
const boardReducer = boardSlice.reducer
export { boardReducer }
export const { saveIssues } = boardSlice.actions
export default boardSlice
