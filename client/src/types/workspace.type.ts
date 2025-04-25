import { UniqueIdentifier } from '@dnd-kit/core'
import { z } from 'zod'

const CreateWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  numSprint: z.number(),
  timePerSprint: z.number(),
  date: z
    .object({
      from: z.date(),
      to: z.date()
    })
    .refine((data) => data.from <= data.to, {
      message: 'Date end need after date start',
      path: ['end']
    })
})

type CreateWorkspaceSchemaType = z.infer<typeof CreateWorkspaceSchema>

type CreateWorkspaceReqType = CreateWorkspaceSchemaType

type WorkspaceResponse = {
  id: UniqueIdentifier
  name: string
  numSprint: number
  timePerSprint: number
  dtStart: Date
  dtEnd?: Date
}

type WorkspaceCardResponse = {
  id: UniqueIdentifier
  name: string
  owner: string
}

export type {
  CreateWorkspaceReqType,
  CreateWorkspaceSchemaType,
  WorkspaceResponse,
  WorkspaceCardResponse
}

export { CreateWorkspaceSchema }
