import { Position } from '@/components/board/type'
import { IssueResponse } from '@/types/issue.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sprint = {
  id: string
}

type BoardState = {
  isLoading: boolean
  currentSprint?: Sprint
  items?: IssueResponse[]
  sprints?: Sprint[]
  position?: Position
}
const initialState: BoardState = {
  isLoading: true
}

// const getPositionThunk = createAsyncThunk<Position, Id>(
//   'boardSlice/get-position',
//   async (req, { rejectWithValue }) => {
//     try {
//       const data = await boardService.getPosition(req)
//       return data
//     } catch (_) {
//       return rejectWithValue('Get Position failed')
//     }
//   }
// )

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
export const { saveIssues, setCurrentSprintBoard } = boardSlice.actions
export default boardSlice
