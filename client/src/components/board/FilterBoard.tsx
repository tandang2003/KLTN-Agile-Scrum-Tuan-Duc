import FilterBoardTabContent from '@/components/board/FilterBoardTabContent'
import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
type FilterBoardProps = {}

const FilterBoard = ({}: FilterBoardProps) => {
  const { workspaceId } = useAppId()
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <Popover>
      <div className='flex'>
        <PopoverTrigger asChild>
          <Button className='mb-3 block'>
            <Icon icon={'mynaui:filter-solid'} />
          </Button>
        </PopoverTrigger>
        <div className='ml-auto'>asdasd</div>
      </div>
      <PopoverContent align='start' className='w-fit'>
        <Tabs defaultValue='sprint' className='flex h-full w-full gap-4'>
          <TabsList className='h-full min-w-[160px] flex-col items-start space-y-2 bg-transparent p-4 [&>*]:w-full [&>*]:justify-start'>
            <TabsTrigger value='sprint'>Sprint</TabsTrigger>
          </TabsList>

          <div className='flex-1 bg-gray-100 p-4'>
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
  )
}

export default FilterBoard
