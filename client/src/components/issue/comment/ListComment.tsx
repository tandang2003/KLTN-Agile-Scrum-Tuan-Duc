import { useCommentContext } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'
import ListView from '@/components/ListView'

const ListComment = () => {
  const { comment } = useCommentContext()

  return (
    <ListView
      data={comment}
      emptyComponent={null}
      render={(item) => {
        return (
          <ItemComment
            key={item.id}
            id={item.id}
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
