import ListView from '@/components/ListView'
import ReportSprintSheetTeacher from '@/components/report/ReportSprintSheetTeacher'
import RowFileReport from '@/components/RowFileReport'
import ToolTip from '@/components/Tooltip'
import { Separator } from '@/components/ui/separator'
import { useGetAllResourceByProjectQuery } from '@/feature/workspace/workspace.api'
import { Id } from '@/types/other.type'
import { ProjectResourceResponseType } from '@/types/resource.type'
import { ComponentProps } from 'react'

type Props = {
  projectId: Id
} & ComponentProps<typeof ReportSprintSheetTeacher>

const ReportByProject = ({ projectId, isOpen, onOpenChange }: Props) => {
  const { data, isFetching } = useGetAllResourceByProjectQuery(projectId)
  return (
    <ReportSprintSheetTeacher isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className='mt-4'>
        <ListView<ProjectResourceResponseType[0]>
          data={data}
          loading={isFetching}
          orientation='vertical'
          render={(item, index) => (
            <div key={item.id} className='mt-3'>
              <ToolTip
                trigger={
                  <h2 className='text-xl'>
                    Issue {index + 1}: {item.name}
                  </h2>
                }
              >
                {item.id}
              </ToolTip>
              <Separator className='my-3' />
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

export default ReportByProject
