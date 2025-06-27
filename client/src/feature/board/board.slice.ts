import { Position } from '@/components/board/type'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id?: Id
}

type BoardState = {
  isLoading: boolean
  filter: Partial<{
    sprintId?: Id
  }>
  items?: IssueResponse[]
  sprints?: Sprint[]
  position?: Position
}
const initialState: BoardState = {
  isLoading: true,
  filter: {}
}

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: initialState,
  reducers: {
    setSprintIdFilter(
      state: BoardState,
      action: PayloadAction<Id | undefined>
    ) {
      state.filter.sprintId = action.payload
    },
    saveIssues: (
      state: BoardState,
      action: PayloadAction<IssueResponse[] | undefined>
    ) => {
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
export const { saveIssues, setSprintIdFilter } = boardSlice.actions
export default boardSlice
