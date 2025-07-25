import FilterBoardTabContent from '@/components/board/FilterBoardTabContent'
import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { useMemo } from 'react'
type FilterBoardProps = {}

const FilterBoard = ({}: FilterBoardProps) => {
  const { workspaceId } = useAppId()
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const sprint = useAppSelector((state) => state.boardSlice.filter.sprint)

  const sprintMemo = useMemo(() => {
    return data?.find((item) => item.id === sprint?.id)
  }, [data])
  return (
    <div className='mb-3 flex items-center gap-4'>
      <Popover>
        <div className='flex'>
          <PopoverTrigger asChild>
            <Button className='block'>
              <Icon icon={'mynaui:filter-solid'} />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent align='start' className='w-fit'>
          <Tabs defaultValue='sprint' className='flex h-full w-full gap-4'>
            <TabsList className='h-full min-w-[160px] flex-col items-start space-y-2 bg-transparent p-4 [&>*]:w-full [&>*]:justify-start'>
              <TabsTrigger value='sprint'>Sprint</TabsTrigger>
            </TabsList>

            <div className='flex-1'>
              <TabsContent value='sprint' className='m-0'>
                <LoadingBoundary<SprintModel[]>
                  fallback=''
                  isLoading={isFetching}
                  data={data}
                >
                  {(data) => <FilterBoardTabContent items={data} />}
                </LoadingBoundary>
              </TabsContent>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
      <div>
        <ToolTip
          trigger={
            <Badge className='text-md active-bg'>{sprintMemo?.title}</Badge>
          }
        >
          {sprintMemo?.id}
        </ToolTip>
      </div>
    </div>
  )
}

export default FilterBoard
