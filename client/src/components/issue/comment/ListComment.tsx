import { useCommentContext } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'
import ListView from '@/components/ListView'
import { uuid } from '@/lib/utils'
import _ from 'lodash'

const ListComment = () => {
  const { comment } = useCommentContext()

  return (
    <ListView
      data={_.orderBy(comment, ['createdAt'], ['asc'])}
      emptyComponent={null}
      render={(item) => {
        return (
          <ItemComment
            key={item?.id ?? uuid()}
            name={item.from}
            message={item.content}
            createdAt={item.createdAt}
          />
        )
      }}
    />
  )
}

export default ListComment
