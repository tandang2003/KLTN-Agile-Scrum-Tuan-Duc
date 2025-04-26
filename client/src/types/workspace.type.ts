import { WorkSpaceModel } from '@/types/model/workspace.model'
import { UniqueIdentifier } from '@dnd-kit/core'
import { z } from 'zod'

const CreateWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  sprintNum: z.number().positive(),
  timePerSprint: z.number().positive(),
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

type CreateWorkspaceReqType = Omit<CreateWorkspaceSchemaType, 'date'> & {
  start: Date
  end: Date
}

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

type WorkspaceSideBar = Pick<WorkSpaceModel, 'id' | 'name'>

export type {
  CreateWorkspaceReqType,
  CreateWorkspaceSchemaType,
  WorkspaceResponse,
  WorkspaceCardResponse,
  WorkspaceSideBar
}

export { CreateWorkspaceSchema }
