import ItemComment from '@/components/issue/comment/ItemComment'
import { CommentType } from '@/types/comment.type'
type ListCommentProps = {
  items?: CommentType[]
}

const ListComment = ({ items }: ListCommentProps) => {
  return (
    <div>
      {items?.map((item) => {
        return (
          <ItemComment
            key={item.id}
            name={item.from}
            message={item.message}
            createdAt={item.createdAt}
          />
        )
      })}
    </div>
  )
}

export default ListComment
