import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import {
  DashboardRes,
  DashboardWorkspaceResponse,
  ProjectWorkloadRes,
  WorkloadDataItem
} from '@/types/dashboard.type'
import { Page, PageRequest, ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const dashboardService = {
  getDashboardProject: async (
    projectId: Id,
    sprintId?: Id
  ): Promise<DashboardRes> => {
    const query = toQueryString({
      projectId,
      sprintId
    })
    const res = await httpService.get<ResponseApi<DashboardRes>>(
      `/dashboard/project?${query}`
    )
    return res.data.data
  },
  getDashboardWorkspace: async (
    workspaceId: Id,
    sprintId?: Id
  ): Promise<DashboardWorkspaceResponse> => {
    const query = toQueryString({
      workspaceId,
      sprintId
    })
    const res = await httpService.get<ResponseApi<DashboardWorkspaceResponse>>(
      `/dashboard/workspace?${query}`
    )
    return res.data.data
  },
  getWorkloadWorkspace: async (
    workspaceId: Id,
    page: PageRequest,
    sprintId?: Id
  ): Promise<Page<WorkloadDataItem>> => {
    const query = toQueryString({
      workspaceId,
      sprintId,
      page: page.page,
      size: page.size
    })
    const res = await httpService.get<ResponseApi<Page<WorkloadDataItem>>>(
      `/dashboard/workspace/workload?${query}`
    )
    return res.data.data
  },
  getProjectWorkspace: async (
    workspaceId: Id,
    page: PageRequest,
    sprintId?: Id
  ): Promise<Page<ProjectWorkloadRes>> => {
    const query = toQueryString({
      workspaceId,
      sprintId,
      page: page.page,
      size: page.size
    })
    const res = await httpService.get<ResponseApi<Page<ProjectWorkloadRes>>>(
      `/dashboard/workspace/project?${query}`
    )
    return res.data.data
  }
}

export default dashboardService
