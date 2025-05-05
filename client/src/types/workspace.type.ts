import { PageRequest } from '@/types/http.type'
import { UserModel } from '@/types/model/user.model'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { Id } from '@/types/other.type'
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

type WorkspaceResponse = Pick<
  WorkSpaceModel,
  'id' | 'name' | 'description' | 'start' | 'end'
>

type WorkspaceCardResponse = {
  id: Id
  name: string
  owner: {
    name: string
  }
}

type WorkspaceSideBar = Pick<WorkSpaceModel, 'id' | 'name'>

type ListWorkspaceReq = PageRequest

type ListStudentWorkspaceReq = Pick<WorkSpaceModel, 'id'> & {
  page?: PageRequest
}

type StudentWorkspaceDataTable = Pick<
  UserModel,
  'id' | 'name' | 'className' | 'role' | 'uniId'
>

type InviteStudentWorkspaceReqType = {
  workspaceId: Id
  studentIds: Id[]
}

export type {
  CreateWorkspaceReqType,
  CreateWorkspaceSchemaType,
  WorkspaceResponse,
  WorkspaceCardResponse,
  WorkspaceSideBar,
  ListWorkspaceReq,
  ListStudentWorkspaceReq,
  StudentWorkspaceDataTable,
  InviteStudentWorkspaceReqType
}

export { CreateWorkspaceSchema }
