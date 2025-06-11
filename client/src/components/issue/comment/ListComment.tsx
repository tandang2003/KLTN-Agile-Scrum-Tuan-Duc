import { useContextComment } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'

const ListComment = () => {
  const { comment } = useContextComment()
  return (
    <div>
      {comment?.map((item) => {
        return (
          <ItemComment
            key={item.id}
            name={item.from}
            message={item.content}
            createdAt={item.createdAt}
          />
        )
      })}
    </div>
  )
}

export default ListComment
