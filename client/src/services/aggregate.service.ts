import httpService from '@/services/http.service'
import { SprintAggregateProcessType } from '@/types/aggregate.type'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const aggregateService = {
  getSprint: async (sprintId: Id): Promise<SprintAggregateProcessType> => {
    return new Promise((resolve) => {
      resolve([
        {
          id: '30%',
          duration: 10,
          issuesStarted: 10,
          issuesAdded: 5,
          issuesRemoved: 2,
          issuesTodo: 3,
          issuesInProgress: 5,
          issueDone: 2,
          members: 4
        },
        {
          id: '50%',
          duration: 12,
          issuesStarted: 8,
          issuesAdded: 6,
          issuesRemoved: 1,
          issuesTodo: 4,
          issuesInProgress: 3,
          issueDone: 3,
          members: 5
        },
        {
          id: '80%',
          duration: 12,
          issuesStarted: 8,
          issuesAdded: 6,
          issuesRemoved: 1,
          issuesTodo: 4,
          issuesInProgress: 3,
          issueDone: 3,
          members: 5
        }
      ])
    })
  },
  createPredict: async (projectId: Id, sprintId: Id) => {
    const res = await httpService.get<ResponseApi<boolean>>(
      `/decision/${projectId}/${sprintId}/predict`
    )
    return res.data.data
  }
}

export default aggregateService
