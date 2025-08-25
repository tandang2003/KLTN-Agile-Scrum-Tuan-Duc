import { useAppSelector } from '@/context/redux/hook'
import { SprintStatusType } from '@/types/model/typeOf'
import { SprintOverview } from '@/types/sprint.type'
import { isAfter, isBefore, isEqual } from 'date-fns'
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
  const sprintNext = useAppSelector((state) => state.sprintSlice.next)
  const sprintPrev = useAppSelector((state) => state.sprintSlice.previous)
  console.log('sprintCurrent', sprintCurrent)
  console.log('sprintPrev', sprintPrev)
  console.log('sprintNext', sprintNext)

  const getStatusSprint = useCallback(
    (sprint: Sprint): SprintStatusType => {
      if (
        sprintPrev &&
        (isBefore(sprint.end, sprintPrev.end) ||
          isEqual(sprint.end, sprintPrev.end))
      )
        return 'COMPLETE'
      if (
        sprintNext &&
        (isAfter(sprint.start, sprintNext.start) ||
          isEqual(sprint.start, sprintNext.start))
      )
        return 'PENDING'
      return 'RUNNING'
    },
    [sprintCurrent, sprintNext, sprintPrev]
  )

  if (!sprintCurrent) {
    return {
      sprint: undefined,
      util: {
        getStatusSprint
      }
    }
  }

  return {
    sprint: {
      id: sprintCurrent.id,
      start: new Date(sprintCurrent.start),
      end: new Date(sprintCurrent.end)
    },
    util: {
      getStatusSprint
    }
  }
}

export default useSprintCurrent
