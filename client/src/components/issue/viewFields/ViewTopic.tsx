import Empty from '@/components/Empty'
import TitleLevel from '@/components/issue/TitleLevel'
import ListView from '@/components/ListView'
import { Badge } from '@/components/ui/badge'
import messages from '@/constant/message.const'
import { TopicModelType } from '@/types/issue.type'
type ViewTopicProps = {
  items: TopicModelType[]
}

const ViewTopic = ({ items }: ViewTopicProps) => {
  return (
    <div>
      <TitleLevel level={'lv-2'}>{messages.component.issue.topic}</TitleLevel>
      <ListView
        data={items}
        emptyComponent={<Empty className='mt-2'>Không có topic được gán</Empty>}
        className='mt-2 rounded-xl border-2 p-2'
        render={(item) => {
          return <Badge className={item.id}>{item.name}</Badge>
        }}
      />
    </div>
  )
}

export default ViewTopic
