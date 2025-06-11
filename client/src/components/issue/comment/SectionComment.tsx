import EditorComment from '@/components/issue/comment/EditorComment'
import ListComment from '@/components/issue/comment/ListComment'
import { ProviderCommentProvider } from '@/components/issue/comment/ContextComment.tsx'

const SectionComment = () => {
  return (
    <ProviderCommentProvider>
      <section>
        <EditorComment />
        <ListComment />
      </section>
    </ProviderCommentProvider>
  )
}

export default SectionComment
