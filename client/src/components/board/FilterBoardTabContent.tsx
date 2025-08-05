import Icon from '@/components/Icon'
import { useSprintSelect } from '@/components/issue/IssueSelectSprintContext'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getSprintStatusDisplayName } from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { setSprintFilter } from '@/feature/board/board.slice'
import { toISODateString } from '@/lib/date.helper'
import { getStatusSprint } from '@/lib/sprint.helper'
import { SprintModel } from '@/types/model/sprint.model'

type FilterBoardTabContentProps = {
  items: SprintModel[]
}

const FilterBoardTabContent = ({ items }: FilterBoardTabContentProps) => {
  const sprint = useAppSelector((state) => state.boardSlice.filter.sprint)
  const dispatch = useAppDispatch()
  const { setSprint } = useSprintSelect()
  const handleSelectSprintFilter = (sprint: SprintModel) => {
    setSprint({
      id: sprint.id,
      start: sprint.start,
      end: sprint.end
    })
    dispatch(
      setSprintFilter({
        id: sprint.id,
        start: toISODateString(sprint.start),
        end: toISODateString(sprint.end)
      })
    )
  }

  return (
    <ScrollArea className='h-[300px] overflow-x-auto'>
      <div className='flex flex-col gap-3'>
        {items.map((item, index) => {
          return (
            <div
              key={item.id}
              className='flex items-start gap-2 border-2 bg-gray-100 p-2'
              onClick={() => {
                handleSelectSprintFilter(item)
              }}
            >
              <div className='border-accent grid size-[20px] place-items-center rounded-xs border-2 bg-white shadow'>
                {item.id === sprint?.id && (
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
                {getSprintStatusDisplayName(getStatusSprint(item))}
              </Badge>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation='vertical' />
    </ScrollArea>
  )
}

export default FilterBoardTabContent
