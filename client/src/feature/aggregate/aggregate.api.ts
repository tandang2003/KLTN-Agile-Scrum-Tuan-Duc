import aggregateService from '@/services/aggregate.service'
import { SprintAggregateProcessType } from '@/types/aggregate.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const aggregateApi = createApi({
  reducerPath: 'aggregateApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getAggregateSprint: builder.query<SprintAggregateProcessType, Id>({
      queryFn: async (arg) => {
        try {
          const data = await aggregateService.getSprint(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})

export default aggregateApi
export const { useGetAggregateSprintQuery } = aggregateApi
