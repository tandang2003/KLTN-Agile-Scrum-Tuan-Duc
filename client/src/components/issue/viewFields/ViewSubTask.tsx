import Empty from '@/components/Empty'
import Icon from '@/components/Icon'
import TitleLevel from '@/components/issue/TitleLevel'
import ListView from '@/components/ListView'
import messages from '@/constant/message.const'
import { SubTaskModel } from '@/types/model/common.model'
type ViewSubTaskProps = {
  items: SubTaskModel[]
}

const ViewSubTask = ({ items }: ViewSubTaskProps) => {
  const message = messages.component.issue.subTasks
  return (
    <div>
      <TitleLevel level={'lv-2'}>{message.label}</TitleLevel>
      <ListView<SubTaskModel>
        data={items}
        emptyComponent={<Empty className='mt-2'>Không có đầu công việc</Empty>}
        className='mt-2 space-y-2'
        render={(item) => {
          return (
            <div
              key={item.id}
              className='flex items-center gap-4 rounded-md border-2 p-2'
            >
              <Icon
                icon={
                  item.checked
                    ? 'mingcute:checkbox-fill'
                    : 'ci:checkbox-unchecked'
                }
              />
              <span>{item.name}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

export default ViewSubTask
