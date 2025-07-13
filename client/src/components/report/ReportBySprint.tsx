import ReportSprintSheetTeacher from '@/components/report/ReportSprintSheetTeacher'
import messages from '@/constant/message.const'
import { Id } from '@/types/other.type'
import { ComponentProps } from 'react'
type Props = {
  sprintId: Id
} & ComponentProps<typeof ReportSprintSheetTeacher>

const ReportBySprint = ({ sprintId, isOpen, onOpenChange }: Props) => {
  const message = messages.component.reportSprintSheet

  return (
    <ReportSprintSheetTeacher isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className='mt-4 grid flex-1 auto-rows-min grid-cols-2 gap-6'>
        <div>
          <h4 className='mb-3 text-base font-semibold'>
            {message.form.daily1.label}
          </h4>
          <div></div>
        </div>
        <div>
          <h4 className='mb-3 text-base font-semibold'>
            {message.form.daily2.label}
          </h4>
        </div>
        <div className='col-span-2'>
          <h4 className='mb-3 text-base font-semibold'>
            {message.form.backlog.label}
          </h4>
        </div>
      </div>
    </ReportSprintSheetTeacher>
  )
}

export default ReportBySprint
