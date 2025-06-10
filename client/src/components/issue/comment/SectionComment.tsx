import EditorComment from '@/components/issue/comment/EditorComment'
import ListComment from '@/components/issue/comment/ListComment'
import {uuid} from '@/lib/utils'
import {ProviderCommentProvider} from "@/components/issue/comment/ContextComment.tsx";


const SectionComment = () => {
  return (
    <ProviderCommentProvider>
      <section>
        <EditorComment/>
        <ListComment
          items={[
            {
              id: uuid(),
              createdAt: new Date(),
              from: 'John Doe',
              message:
                'This is a sample comment message. It can be quite long, depending on the discussion and the details that need to be shared.',
            }
          ]}
        />
      </section>
    </ProviderCommentProvider>
  )
}

export default SectionComment
