import relationshipService from '@/services/relationship.service'
import { IssueResponse } from '@/types/issue.type'
import { IssueRelationShip } from '@/types/model/relationship'
import { Id } from '@/types/other.type'
import {
  CreateRelationshipIssueRequest,
  RelationshipResponse
} from '@/types/relationship.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const relationshipApi = createApi({
  reducerPath: 'relationshipApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Relationships'],
  endpoints: (builder) => ({
    getRelationship: builder.query<RelationshipResponse[] | null, Id>({
      async queryFn(arg) {
        try {
          const data = await relationshipService.getRelationship(arg)
          return {
            data: data
          }
        } catch (_) {
          return {
            error: {
              status: 500,
              data: 'An unexpected error occurred'
            }
          }
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map((item) => ({
              type: 'Relationships' as const,
              id: item.issueRelated.id
            })),
            {
              type: 'Relationships' as const,
              id: 'LIST'
            }
          ]
          return final
        }
        const final = [
          {
            type: 'Relationships' as const,
            id: 'LIST'
          }
        ]
        return final
      }
    }),
    getIssueAvailable: builder.query<
      IssueResponse[] | null,
      {
        issueId: Id
        type: IssueRelationShip
      }
    >({
      async queryFn({ issueId, type }) {
        try {
          const data = await relationshipService.checkRelationship(
            issueId,
            type
          )
          return {
            data: data
          }
        } catch (_) {
          return {
            error: {
              status: 500,
              data: 'An unexpected error occurred'
            }
          }
        }
      }
    }),
    createRelationship: builder.mutation<
      RelationshipResponse,
      CreateRelationshipIssueRequest
    >({
      async queryFn(arg) {
        try {
          const data = await relationshipService.createRelationship(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => {
        return [{ type: 'Relationships', id: 'LIST' }]
      }
    })
  })
})
export default relationshipApi
export const {
  useGetRelationshipQuery,
  useLazyGetIssueAvailableQuery,
  useCreateRelationshipMutation
} = relationshipApi
