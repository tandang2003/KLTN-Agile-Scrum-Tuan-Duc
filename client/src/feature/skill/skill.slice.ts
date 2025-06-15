import { SkillResponse } from '@/types/skill.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SkillState = {
  data?: SkillResponse
  mode: 'create' | 'update'
}
const initialState: SkillState = {
  mode: 'create'
}

const skillSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setUpdateDataSkill: (
      state: SkillState,
      action: PayloadAction<SkillResponse>
    ) => {
      state.data = action.payload
      state.mode = 'update'
    },
    resetUpdateDataSkill: (state: SkillState) => {
      state.data = undefined
      state.mode = 'create'
    }
  }
})

const skillReducer = skillSlice.reducer
export { skillReducer }
export const { setUpdateDataSkill, resetUpdateDataSkill } = skillSlice.actions
export default skillSlice
