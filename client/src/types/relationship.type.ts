import { IssueResponse } from '@/types/issue.type'
import { IssueRelationShip } from '@/types/model/relationship'
import { Id } from '@/types/other.type'
import { z } from 'zod'

const CreateRelationshipIssueSchema = z.object({
  issueRelatedId: z.string(),
  typeRelation: z.string().refine((val) => val in IssueRelationShip, {
    message: 'Invalid typeRelation key'
  })
})

type RelationshipResponse = {
  issueRelated: IssueResponse
  typeRelation: string
}
type CreateRelationshipIssueRequest = CreateRelationshipIssueType & {
  issueId: Id
}
type DeleteRelationshipIssueRequest = {
  issueId: Id
  issueRelatedId: Id
}

type CreateRelationshipIssueType = z.infer<typeof CreateRelationshipIssueSchema>
export type {
  CreateRelationshipIssueType,
  RelationshipResponse,
  CreateRelationshipIssueRequest,
  DeleteRelationshipIssueRequest
}
export { CreateRelationshipIssueSchema }
