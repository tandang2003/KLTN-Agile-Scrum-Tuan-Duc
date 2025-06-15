import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { SkillRequest, SkillResponse } from '@/types/skill.type'

const skillService = {
  getSkills: async (): Promise<Array<string>> => {
    const response =
      await httpService.get<ResponseApi<Array<string>>>('/skill/list-all')
    return response.data.data
  },
  getSkillsPersonal: async (): Promise<Array<SkillResponse>> => {
    const response =
      await httpService.get<ResponseApi<Array<SkillResponse>>>('/skill/list')
    return response.data.data
  },
  createSkill: async (req: SkillRequest) => {
    await httpService.post<void, SkillRequest>('/skill', req)
  },
  deleteSkill: async (req: SkillRequest) => {
    await httpService.delete<void>(`/skill`, {
      data: req
    })
  },
  updateSkill: async (req: SkillRequest) => {
    await httpService.put<void, SkillRequest>(`skill`, req)
  }
}
export default skillService
