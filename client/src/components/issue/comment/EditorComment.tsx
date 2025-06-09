import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import { ReactNode, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
type CommentEditorProps = {
  children: ReactNode
}

const EditorComment = () => {
  const handlePushComment = (val: string) => {
    console.log(val)
  }
  return (
    <div className='flex gap-2'>
      <Avatar className='mt-2'>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <InlineEdit<string>
        value={''}
        onSave={handlePushComment}
        className='block flex-1'
        displayComponent={(value) => {
          return (
            <HtmlViewer
              className='px-2 py-3 text-base'
              fallback={'Add a description...'}
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
                Save
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default EditorComment
