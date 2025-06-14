import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  CreateIssueRequest,
  IssueDetailResponse,
  IssueResponse,
  UpdateIssueRequest,
  UpdatePositionIssueRequest
} from '@/types/issue.type'
import { IssueRelationShip } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import {
  CreateRelationshipIssueRequest,
  RelationshipResponse
} from '@/types/relationship.type'

const issueService = {
  getIssues: async (projectId: Id, sprintId?: Id): Promise<IssueResponse[]> => {
    const query = toQueryString({
      project_id: projectId,
      sprint_id: sprintId
    })
    const res = await httpService.get<ResponseApi<IssueResponse[]>>(
      `/issue/list?${query}`
    )
    return res.data.data
  },
  createIssue: async (req: CreateIssueRequest): Promise<IssueResponse> => {
    const res = await httpService.post<
      ResponseApi<IssueResponse>,
      CreateIssueRequest
    >('/issue', req)
    return res.data.data
  },
  getIssue: async (
    issueId: Id,
    sprintId?: Id
  ): Promise<IssueDetailResponse> => {
    const res = await httpService.get<ResponseApi<IssueDetailResponse>>(
      `/issue/${issueId}${sprintId ? `/${sprintId}` : ''}`
    )
    return res.data.data
  },
  updateIssue: async (
    req: UpdateIssueRequest
  ): Promise<IssueDetailResponse> => {
    const res = await httpService.put<
      ResponseApi<IssueDetailResponse>,
      UpdateIssueRequest
    >(`/issue`, req)
    return res.data.data
  },
  updatePosition: async (req: UpdatePositionIssueRequest) => {
    const res = await httpService.put<
      ResponseApi<IssueResponse>,
      UpdatePositionIssueRequest
    >(`/issue/update-status`, req)
    return res.data.data
  },
  createRelationship: async (
    req: CreateRelationshipIssueRequest
  ): Promise<RelationshipResponse> => {
    const res = await httpService.post<
      ResponseApi<RelationshipResponse>,
      CreateRelationshipIssueRequest
    >(`/issue/relation`, req)
    return res.data.data
  }
}
export default issueService
