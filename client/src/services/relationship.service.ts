import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { IssueResponse } from '@/types/issue.type'
import { IssueRelationShip } from '@/types/model/relationship'
import { Id } from '@/types/other.type'
import {
  CreateRelationshipIssueRequest,
  DeleteRelationshipIssueRequest,
  RelationshipResponse
} from '@/types/relationship.type'

const relationshipService = {
  createRelationship: async (
    req: CreateRelationshipIssueRequest
  ): Promise<RelationshipResponse> => {
    const res = await httpService.post<
      ResponseApi<RelationshipResponse>,
      CreateRelationshipIssueRequest
    >(`/issue/relation`, req)
    return res.data.data
  },
  deleteRelationship: async (
    req: DeleteRelationshipIssueRequest
  ): Promise<void> => {
    const res = await httpService.delete<ResponseApi<void>>(`/issue/relation`, {
      data: req
    })
    return res.data.data
  },
  checkRelationship: async (
    issueId: Id,
    type: IssueRelationShip
  ): Promise<IssueResponse[] | null> => {
    const res = await httpService.get<ResponseApi<IssueResponse[] | null>>(
      `/issue/${issueId}/checking-relations?type=${type}`
    )
    return res.data.data
  },
  getRelationship: async (
    issueId: Id
  ): Promise<RelationshipResponse[] | null> => {
    const res = await httpService.get<
      ResponseApi<RelationshipResponse[] | null>
    >(`/issue/${issueId}/relations`)
    return res.data.data
  }
}
export default relationshipService
