import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { Id } from '@/types/other.type'
import { useMemo, useCallback } from 'react'

type Sprint = {
  id: Id
  title: string
  start: Date
  end: Date
}

type UseSprintOrderResult = {
  data: Sprint[]
  utils: {
    getSprintById: (id: Id) => Sprint | null
  }
  dataByStatus: Sprint[]
}

const useSprintOrder = (): UseSprintOrderResult => {
  const { workspaceId } = useAppId()

  const { data = [] } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const { sprint: currentSprint } = useSprintCurrent()

  const getSprintById = useCallback(
    (id: Id): Sprint | null => {
      return data.find((item) => item.id === id) ?? null
    },
    [data]
  )

  const sprintData = useMemo(
    () =>
      data.map(({ id, title, start, end }) => ({
        id,
        title,
        start: new Date(start),
        end: new Date(end)
      })),
    [data]
  )

  const sprintDataStatus = useMemo(() => {
    if (!currentSprint) {
      // If no current sprint, sort by start date
      return [...sprintData].sort(
        (a, b) => a.start.getTime() - b.start.getTime()
      )
    }

    return [...sprintData].sort((a, b) => {
      const nowId = currentSprint.id

      const getStatusWeight = (sprint: Sprint): number => {
        if (sprint.id === nowId) return 0 // Current sprint
        if (sprint.start > new Date(currentSprint.end)) return 1 // Upcoming
        if (sprint.end < new Date(currentSprint.start)) return 2 // Past
        return 1 // Overlapping or unclear: treat as middle
      }

      const weightA = getStatusWeight(a)
      const weightB = getStatusWeight(b)

      if (weightA !== weightB) {
        return weightA - weightB
      }

      // If same category, sort by start date
      return a.start.getTime() - b.start.getTime()
    })
  }, [sprintData, currentSprint])

  return {
    data: sprintData,
    utils: {
      getSprintById
    },
    dataByStatus: sprintDataStatus
  }
}

export default useSprintOrder
