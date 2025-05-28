import { dateRange } from '@/types/common.type'
import { PageRequest } from '@/types/http.type'
import { ProjectModel } from '@/types/model/project.model'
import { UserModel } from '@/types/model/user.model'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { Id } from '@/types/other.type'
import { z } from 'zod'

const CreateWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  sprintNum: z.number().positive(),
  timePerSprint: z.number().positive(),
  date: dateRange.refine((data) => data.from <= data.to, {
    message: 'Date end need after date start',
    path: ['to']
  })
})

const UpdateWorkspaceSchema = z.object({
  description: z.string().optional(),
  sprintNum: z.number().positive(),
  date: z
    .object({
      from: z.date(),
      to: z.date()
    })
    .refine((data) => data.from <= data.to, {
      message: 'Date end need after date start',
      path: ['to']
    })
})

type CreateWorkspaceSchemaType = z.infer<typeof CreateWorkspaceSchema>

type UpdateWorkspaceSchemaType = z.infer<typeof UpdateWorkspaceSchema>

type CreateWorkspaceReqType = Omit<CreateWorkspaceSchemaType, 'date'> & {
  start: Date
  end: Date
}

type UpdateWorkspaceReqType = Omit<UpdateWorkspaceSchemaType, 'date'> & {
  end: Date
}

type WorkspaceResponse = Pick<
  WorkSpaceModel,
  | 'id'
  | 'name'
  | 'description'
  | 'start'
  | 'end'
  | 'timePerSprint'
  | 'sprintNum'
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

type ListProjectWorkspaceReq = Pick<WorkSpaceModel, 'id'> & {
  page?: PageRequest
}

type StudentWorkspaceDataTable = Pick<
  UserModel,
  'id' | 'name' | 'className' | 'role' | 'uniId'
>

type ProjectWorkspaceDataTable = Pick<
  ProjectModel,
  'id' | 'name' | 'description' | 'createdAt'
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
  InviteStudentWorkspaceReqType,
  UpdateWorkspaceSchemaType,
  UpdateWorkspaceReqType,
  ListProjectWorkspaceReq,
  ProjectWorkspaceDataTable
}

export { CreateWorkspaceSchema, UpdateWorkspaceSchema }
