import ItemComment from '@/components/issue/comment/ItemComment'
import ListView from '@/components/ListView'
import { useGetCommentsQuery } from '@/feature/issue/issue.api'
import { uuid } from '@/lib/utils'
import _ from 'lodash'

import { Id } from '@/types/other.type'
import Empty from '@/components/Empty'
type ViewCommentProps = {
  issueId: Id
}

const ViewComment = ({ issueId }: ViewCommentProps) => {
  const { data, isFetching } = useGetCommentsQuery(issueId)
  return (
    <ListView
      data={_.orderBy(data)}
      loading={isFetching}
      emptyComponent={<Empty>Không có comment</Empty>}
      render={(item) => (
        <ItemComment
          key={item?.id ?? uuid()}
          name={item.from}
          message={item.content}
          createdAt={item.createdAt}
        />
      )}
    />
  )
}

export default ViewComment
