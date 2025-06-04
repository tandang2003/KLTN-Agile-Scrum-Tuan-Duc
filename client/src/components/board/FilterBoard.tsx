import Icon from '@/components/Icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/button-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
import LoadingBoundary from '@/components/LoadingBoundary'
import { SprintModel } from '@/types/model/sprint.model'
import { useState } from 'react'
import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentSprint } from '@/feature/sprint/sprint.slice'
import { Button } from '@/components/ui/button'
type FilterBoardProps = {}

const FilterBoard = ({}: FilterBoardProps) => {
  const { workspaceId } = useAppId()
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const dispatch = useAppDispatch()

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
                      onValueChange={(item) =>
                        dispatch(
                          setCurrentSprint(
                            item
                              ? {
                                  id: item.id,
                                  start: new Date(item.start).toISOString(),
                                  end: new Date(item.end).toISOString()
                                }
                              : undefined
                          )
                        )
                      }
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
  onValueChange?: (sprint: SprintModel | null) => void
}

const SprintTabContent = ({ items, onValueChange }: SprintTabContentProps) => {
  const [selectItem, setSelectItem] = useState<Id | null>(null)
  return (
    <div className='flex flex-col gap-3'>
      {items.map((item, index) => {
        return (
          <div
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
