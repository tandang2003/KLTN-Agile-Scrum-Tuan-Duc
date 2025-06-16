import { FilterSprintBoard, Position } from '@/components/board/type'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id?: Id
}

type BoardState = {
  isLoading: boolean
  currentSprint?: Sprint
  filterSprint: FilterSprintBoard
  items?: IssueResponse[]
  sprints?: Sprint[]
  position?: Position
}
const initialState: BoardState = {
  isLoading: true,
  filterSprint: {}
}

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: initialState,
  reducers: {
    setCurrentSprintBoard(
      state: BoardState,
      action: PayloadAction<Sprint | undefined>
    ) {
      state.currentSprint = action.payload
    },
    setSprintIdFilter(
      state: BoardState,
      action: PayloadAction<Id | undefined>
    ) {
      state.filterSprint.sprintId = action.payload
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
  // extraReducers: (builder) => {
  //   builder.addCase(getPositionThunk.fulfilled, (state, action) => {
  //     state.position = action.payload
  //   })
  // }
})
const boardReducer = boardSlice.reducer
export { boardReducer }
export const { saveIssues, setCurrentSprintBoard, setSprintIdFilter } =
  boardSlice.actions
export default boardSlice
