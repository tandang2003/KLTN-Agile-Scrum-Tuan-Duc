import dashboardService from '@/services/dashboard.service'
import { DashboardRes } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getDashboard: builder.query<
      DashboardRes,
      {
        projectId: Id
        sprintId?: Id
      }
    >({
      queryFn: async ({ projectId, sprintId }) => {
        try {
          const data = await dashboardService.getDashboardRes(
            projectId,
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
export const { useGetDashboardQuery } = dashboardApi
