import ListView from '@/components/ListView'
import { useGetCommentsQuery } from '@/feature/issue/issue.api'
import _ from 'lodash'

import Empty from '@/components/Empty'
import ViewItemComment from '@/components/issue/comment/ViewItemComment'
import { Id } from '@/types/other.type'
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
        <ViewItemComment
          id={item.id}
          key={item.id}
          name={item.from}
          message={item.content}
          createdAt={item.createdAt}
        />
      )}
    />
  )
}

export default ViewComment
