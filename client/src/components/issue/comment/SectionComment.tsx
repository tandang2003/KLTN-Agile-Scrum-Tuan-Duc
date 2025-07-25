import { CommentProvider } from '@/components/issue/comment/ContextComment.tsx'
import EditorComment from '@/components/issue/comment/EditorComment'
import ListComment from '@/components/issue/comment/ListComment'
import { useAppSelector } from '@/context/redux/hook'
import commentService from '@/services/comment.service'
import { CommentResType } from '@/types/comment.type'
import { useEffect, useState } from 'react'

const SectionComment = () => {
  const id = useAppSelector((state) => state.issueSlice.current?.id)
  const [comment, setComment] = useState<CommentResType[]>()
  useEffect(() => {
    if (id) {
      console.log('fetch comment for issue', id)
      commentService.getComment(id).then((res) => {
        setComment(res)
      })
    }
  }, [id])
  return (
    <CommentProvider initValue={comment}>
      <section>
        <EditorComment />
        <ListComment />
      </section>
    </CommentProvider>
  )
}

export default SectionComment
