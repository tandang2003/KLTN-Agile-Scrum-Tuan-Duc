import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { setSprintIdFilter } from '@/feature/board/board.slice'
import { setSprintActive } from '@/feature/sprint/sprint.slice'
import { getStatusSprint } from '@/lib/sprint.helper'
import { SprintModel } from '@/types/model/sprint.model'

type FilterBoardTabContentProps = {
  items: SprintModel[]
}

const FilterBoardTabContent = ({ items }: FilterBoardTabContentProps) => {
  const { sprintId } = useAppSelector((state) => state.boardSlice.filter)
  const dispatch = useAppDispatch()

  const handleSelectSprintFilter = (sprint: SprintModel) => {
    dispatch(setSprintIdFilter(sprint.id))
    dispatch(
      setSprintActive({
        id: sprint.id,
        start: new Date(sprint.start).toISOString(),
        end: new Date(sprint.end).toISOString()
      })
    )
  }

  return (
    <div className='flex flex-col gap-3'>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            className='flex items-start gap-2 border-2 p-2'
            onClick={() => {
              handleSelectSprintFilter(item)
            }}
          >
            <div className='border-accent grid size-[20px] place-items-center rounded-xs border-2 bg-white shadow'>
              {item.id === sprintId && (
                <Icon icon={'octicon:check-16'} size={15} />
              )}
            </div>
            <div className='min-w-[200px]'>
              <div className=''>Sprint {index + 1}</div>
              <div className='text-xs'>{item.title}</div>
            </div>
            <Badge
              statusSprint={getStatusSprint(item)}
              className='ml-auto basis-[100px]'
            >
              {getStatusSprint(item)}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}

export default FilterBoardTabContent
