import EditorComment from '@/components/issue/comment/EditorComment'
import ListComment from '@/components/issue/comment/ListComment'
import { ReactNode } from 'react'
type CommentProps = {
  children: ReactNode
}

const SectionComment = () => {
  return (
    <section>
      <EditorComment />
      <ListComment />
    </section>
  )
}

export default SectionComment
