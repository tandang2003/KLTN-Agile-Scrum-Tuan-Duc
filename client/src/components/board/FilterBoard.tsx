import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentSprint } from '@/feature/board/board.slice'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { useState } from 'react'
type FilterBoardProps = {}

const FilterBoard = ({}: FilterBoardProps) => {
  const { workspaceId } = useAppId()
  const { sprint } = useBoard()
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const dispatch = useAppDispatch()

  const handleValueChange = (item: SprintModel | null) => {
    dispatch(
      setCurrentSprint(
        item
          ? {
              id: item.id
            }
          : undefined
      )
    )
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Icon icon={'mynaui:filter-solid'} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-fit'>
          <Tabs defaultValue='sprint' className='flex h-full w-full gap-4'>
            {/* Tabs List on the left */}
            <TabsList className='h-full min-w-[160px] flex-col items-start space-y-2 bg-transparent p-4 [&>*]:w-full [&>*]:justify-start'>
              <TabsTrigger value='sprint'>Sprint</TabsTrigger>
            </TabsList>

            {/* Content on the right */}
            <div className='flex-1 bg-gray-100 p-4'>
              <TabsContent value='sprint' className='m-0'>
                <LoadingBoundary<SprintModel[]>
                  fallback=''
                  isLoading={isFetching}
                  data={data}
                >
                  {(data) => (
                    <SprintTabContent
                      items={data}
                      initialValue={sprint?.id ?? null}
                      onValueChange={handleValueChange}
                    />
                  )}
                </LoadingBoundary>
              </TabsContent>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  )
}

type SprintTabContentProps = {
  items: SprintModel[]
  initialValue?: Id | null
  onValueChange?: (sprint: SprintModel | null) => void
}

const SprintTabContent = ({
  items,
  onValueChange,
  initialValue = null
}: SprintTabContentProps) => {
  const [selectItem, setSelectItem] = useState<Id | null>(initialValue)
  return (
    <div className='flex flex-col gap-3'>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            className='flex items-start gap-2 border-2 p-2'
            onClick={() => {
              setSelectItem(selectItem === item.id ? null : item.id)
              onValueChange?.(selectItem === item.id ? null : item)
            }}
          >
            <div className='border-accent grid size-[20px] place-items-center rounded-xs border-2 bg-white shadow'>
              {item.id === selectItem && (
                <Icon icon={'octicon:check-16'} size={15} />
              )}
            </div>
            <div className='min-w-[200px]'>
              <div className=''>Sprint {index + 1}</div>
              <div className='text-xs'>{item.title}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FilterBoard
