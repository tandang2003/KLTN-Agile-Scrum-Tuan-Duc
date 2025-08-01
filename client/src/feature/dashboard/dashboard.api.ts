import dashboardService from '@/services/dashboard.service'
import {
  DashboardRes,
  DashboardWorkspaceResponse,
  ProjectPredictRes,
  ProjectWorkloadRes,
  WorkloadDataItem
} from '@/types/dashboard.type'
import { Page, PageRequest } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getDashboardProject: builder.query<
      DashboardRes,
      {
        projectId: Id
        sprintId?: Id
      }
    >({
      queryFn: async ({ projectId, sprintId }) => {
        try {
          const data = await dashboardService.getDashboardProject(
            projectId,
            sprintId
          )
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getDashboardWorkspace: builder.query<
      DashboardWorkspaceResponse,
      {
        workspaceId: Id
        sprintId?: Id
      }
    >({
      queryFn: async ({ workspaceId, sprintId }) => {
        try {
          const data = await dashboardService.getDashboardWorkspace(
            workspaceId,
            sprintId
          )
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getWorkloadWorkspace: builder.query<
      Page<WorkloadDataItem>,
      {
        workspaceId: Id
        page: PageRequest
        sprintId?: Id
      }
    >({
      queryFn: async ({ workspaceId, page, sprintId }) => {
        try {
          const data = await dashboardService.getWorkloadWorkspace(
            workspaceId,
            page,
            sprintId
          )
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getProjectWorkspace: builder.query<
      Page<ProjectWorkloadRes>,
      {
        workspaceId: Id
        page: PageRequest
        sprintId?: Id
      }
    >({
      queryFn: async ({ workspaceId, page, sprintId }) => {
        try {
          const data = await dashboardService.getProjectWorkspace(
            workspaceId,
            page,
            sprintId
          )
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getProjectPredict: builder.query<
      Page<ProjectPredictRes>,
      {
        workspaceId: Id
        page: PageRequest
        sprintId?: Id
      }
    >({
      queryFn: async ({ workspaceId, page, sprintId }) => {
        try {
          const data = await dashboardService.getProjectPredict(
            workspaceId,
            page,
            sprintId
          )
          return { data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})

export default dashboardApi
export const {
  useGetDashboardProjectQuery,
  useGetDashboardWorkspaceQuery,
  useGetProjectWorkspaceQuery,
  useGetWorkloadWorkspaceQuery,
  useGetProjectPredictQuery
} = dashboardApi
