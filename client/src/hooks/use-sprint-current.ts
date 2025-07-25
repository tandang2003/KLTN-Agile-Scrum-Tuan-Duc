import { useAppSelector } from '@/context/redux/hook'
import { SprintStatusType } from '@/types/model/typeOf'
import { SprintOverview } from '@/types/sprint.type'
import { isAfter, isBefore } from 'date-fns'
import { useCallback } from 'react'

type Sprint = SprintOverview

type useSprintCurrentReturnType = {
  sprint?: Sprint
  util: {
    getStatusSprint: (sprint: Sprint) => SprintStatusType
  }
}

const useSprintCurrent = (): useSprintCurrentReturnType => {
  const sprintCurrent = useAppSelector((state) => state.sprintSlice.current)

  const getStatusSprint = useCallback(
    (sprint: Sprint): SprintStatusType => {
      if (isBefore(sprint.start, start)) return 'COMPLETE'
      if (isAfter(sprint.end, end)) return 'PENDING'
      return 'RUNNING'
    },
    [sprintCurrent]
  )

  if (!sprintCurrent) {
    return {
      sprint: undefined,
      util: {
        getStatusSprint: () => 'PENDING'
      }
    }
  }
  const { end, id, start } = sprintCurrent

  return {
    sprint: {
      id: id,
      start: new Date(start),
      end: new Date(end)
    },
    util: {
      getStatusSprint
    }
  }
}

export default useSprintCurrent
