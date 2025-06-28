import { Position } from '@/components/board/type'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id: Id
  start: string
  end: string
}

type BoardState = {
  isLoading: boolean
  filter: Partial<{
    sprint: Sprint
  }>
  items?: IssueResponse[]
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
    setSprintFilter(
      state: BoardState,
      action: PayloadAction<Sprint | undefined>
    ) {
      state.filter.sprint = action.payload
    }
  }
})
const boardReducer = boardSlice.reducer
export { boardReducer }
export const { setSprintFilter } = boardSlice.actions
export default boardSlice
