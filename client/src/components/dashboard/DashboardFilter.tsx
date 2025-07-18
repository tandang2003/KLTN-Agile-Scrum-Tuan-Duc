import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { useProjectDashBoard } from '@/pages/manager/workspace/project/dashboard/context'
import { Id } from '@/types/other.type'

const DashboardFilter = () => {
  const {
    sprint: { id },
    setSprint
  } = useProjectDashBoard()
  const { workspaceId } = useAppId()
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const handleSelect = (value: string) => {
    setSprint(
      value === 'all'
        ? {
            id: undefined
          }
        : {
            id: value
          }
    )
  }

  return (
    <div>
      <Select defaultValue={id ?? 'all'} onValueChange={handleSelect}>
        <div className='flex items-center'>
          <span className='mr-5 inline-block'>Sprint</span>
          <SelectTrigger className='w-[280px]'>
            <SelectValue className='text-left' placeholder='Chọn sprint' />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectItem key={0} value='all'>
            Tất cả
          </SelectItem>
          {data?.map((item, index) => {
            return (
              <SelectItem key={item.id} value={item.id}>
                Sprint {index + 1}: {item.title}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DashboardFilter
