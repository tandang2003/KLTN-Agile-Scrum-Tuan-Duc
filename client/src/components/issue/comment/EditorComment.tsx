import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import { useCommentContext } from '@/components/issue/comment/ContextComment.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import messages from '@/constant/message.const'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const EditorComment = () => {
  const message = messages.component.editorComment
  const [value, setValue] = useState<string>('')

  const { pushComment } = useCommentContext()

  return (
    <div className='flex gap-2'>
      <div className='basis-[50px]'>
        <Avatar className='mt-2'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <InlineEdit<string>
        value={value}
        onSave={pushComment}
        className='block flex-1'
        displayComponent={(_) => {
          return (
            <HtmlViewer
              className='rounded-md border px-2 py-3 text-base shadow-md hover:bg-gray-300'
              fallback={message.placeholder}
            />
          )
        }}
        renderEditor={({ value, onChange, onCancel, onBlur, ref }) => (
          <div className='flex-1'>
            <Textarea
              className='w-full resize-none'
              value={value}
              ref={ref}
              onChange={(e) => {
                onChange(e.target.value)
                setValue('')
              }}
            />
            <div className='mt-3 flex justify-end gap-3'>
              <Button
                type='button'
                className='cancel'
                onClick={() => {
                  onCancel()
                }}
              >
                {message.cancel}
              </Button>
              <Button
                type='button'
                className='success'
                onClick={() => onBlur()}
              >
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
