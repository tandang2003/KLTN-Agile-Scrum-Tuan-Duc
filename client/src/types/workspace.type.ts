import { UniqueIdentifier } from '@dnd-kit/core'
import { z } from 'zod'

const CreateWorkspaceForm = z
  .object({
    name: z.string(),
    description: z.string(),
    numSprint: z.number().positive(),
    timePerSprint: z.number().positive(),
    start: z.date(),
    end: z.date()
  })
  .refine((data) => data.end >= data.start, {
    message: 'Date end need after date start',
    path: ['end']
  })
type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceForm>

type CreateWorkspaceReqType = CreateWorkspaceFormType

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
  CreateWorkspaceFormType,
  WorkspaceResponse,
  WorkspaceCardResponse
}

export { CreateWorkspaceForm }
