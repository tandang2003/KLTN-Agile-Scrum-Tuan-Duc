import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import { useCommentContext } from '@/components/issue/comment/ContextComment.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import messages from '@/constant/message.const'
import { useAppSelector } from '@/context/redux/hook.ts'
import { RootState } from '@/context/redux/store.ts'
import commentService from '@/services/comment.service.ts'
import { useState } from 'react'

const EditorComment = () => {
  const message = messages.component.editorComment
  const issueId = useAppSelector(
    (state: RootState) => state.issueSlice.current?.id
  )
  const { isReady, ws } = useCommentContext()
  const [comment, setComment] = useState<string>('')

  const handlePushComment = (val: string) => {
    if (issueId && isReady) {
      commentService.sendComment(ws, issueId, {
        content: val
      })
      setComment('')
    }
  }

  return (
    <div className='flex gap-2'>
      <div className='basis-[50px]'>
        <Avatar className='mt-2'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <InlineEdit<string>
        value={comment}
        onSave={handlePushComment}
        className='block flex-1'
        displayComponent={(_) => {
          return (
            <HtmlViewer
              className='rounded-md border px-2 py-3 text-base shadow-md hover:bg-gray-300'
              fallback={message.placeholder}
            />
          )
        }}
        renderEditor={({ value, onChange, onBlur, ref }) => (
          <div className='flex-1'>
            <Editor
              value={value}
              className='w-full'
              classNameContainer='flex-1'
              ref={ref}
              onChange={(_, __, ___, editor) => onChange(editor.getHTML())}
            />
            <div className='mt-3 flex justify-end'>
              <Button type='button' onClick={() => onBlur()}>
                {message.send}
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  )
}
export default EditorComment
