import { dateRange, stringSchema } from '@/types/other.type'
import { PageRequest } from '@/types/http.type'
import { ProjectModel } from '@/types/model/project.model'
import { UserModel } from '@/types/model/user.model'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { z } from 'zod'
import { RoleType } from '@/types/auth.type'
import { CourseResponseType, UserCourseResponseType } from '@/types/course.type'

const CreateWorkspaceSchema = z.object({
  name: stringSchema.min(1, 'Tên không được để trống'),
  description: z.string().optional(),
  date: dateRange,
  courseId: z.string().min(1, 'Khóa học không được để trống')
})

const UpdateWorkspaceSchema = z.object({
  description: z.string().optional(),
  date: dateRange
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

type WorkspaceDetailResponse = Pick<
  WorkSpaceModel,
  'id' | 'name' | 'description' | 'start' | 'end' | 'sprintNum'
> & {
  prevSprint: SprintResponse | null
  currentSprint: SprintResponse | null
  nextSprint: SprintResponse | null
  course: CourseResponseType
  prerequisiteCourse: UserCourseResponseType[]
}

type WorkspaceResponse = {
  id: Id
  name: string
  owner: {
    name: string
  }
  prevSprint: SprintResponse | null
  currentSprint: SprintResponse | null
  nextSprint: SprintResponse | null
  sprintNum: number
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
  'id' | 'name' | 'className' | 'uniId'
> & {
  role: RoleType
}

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
  WorkspaceDetailResponse,
  WorkspaceResponse,
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
