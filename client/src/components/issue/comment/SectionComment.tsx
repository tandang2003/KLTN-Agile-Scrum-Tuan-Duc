import { ProviderCommentProvider } from '@/components/issue/comment/ContextComment.tsx'
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
    if (id)
      commentService.getComment(id).then((res) => {
        setComment(res)
      })
  }, [id])
  return (
    <ProviderCommentProvider initValue={comment}>
      <section>
        <EditorComment />
        <ListComment />
      </section>
    </ProviderCommentProvider>
  )
}

export default SectionComment
