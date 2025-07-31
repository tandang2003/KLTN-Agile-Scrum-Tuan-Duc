import ListView from '@/components/ListView'
import ReportSprintSheetTeacher from '@/components/report/ReportSprintSheetTeacher'
import RowFileReport from '@/components/RowFileReport'
import ToolTip from '@/components/Tooltip'
import { useGetAllResourceBySprintQuery } from '@/feature/workspace/workspace.api'
import { Id } from '@/types/other.type'
import { ProjectResourceResponseType } from '@/types/resource.type'
import { ComponentProps } from 'react'
type Props = {
  sprintId: Id
} & ComponentProps<typeof ReportSprintSheetTeacher>

const ReportBySprint = ({ sprintId, isOpen, onOpenChange }: Props) => {
  const { data, isFetching } = useGetAllResourceBySprintQuery(sprintId)

  return (
    <ReportSprintSheetTeacher isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className='mt-4'>
        <ListView<ProjectResourceResponseType[0]>
          data={data?.map((item) => ({
            ...item,
            name: item.title
          }))}
          loading={isFetching}
          orientation='vertical'
          render={(item) => (
            <div key={item.id} className='mt-3'>
              <ToolTip trigger={<h2 className='text-xl'>{item.name}</h2>}>
                {item.id}
              </ToolTip>
              <RowFileReport
                data={{
                  daily: item.daily,
                  fileBacklog: item.fileBacklog
                }}
              />
            </div>
          )}
          className='gap-4'
        />
      </div>
    </ReportSprintSheetTeacher>
  )
}

export default ReportBySprint
