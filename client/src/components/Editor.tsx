import { cn } from '@/lib/utils'
import 'quill/dist/quill.snow.css'
import ReactQuill, { ReactQuillProps } from 'react-quill'

import { forwardRef } from 'react'

type EditorProps = {
  classNameContainer?: string
} & ReactQuillProps

const Editor = forwardRef<ReactQuill, EditorProps>(
  ({ value = '', onChange, classNameContainer, ...props }, ref) => {
    return (
      <div className={cn('overflow-y-auto', classNameContainer)}>
        <ReactQuill {...props} value={value} onChange={onChange} ref={ref} />
      </div>
    )
  }
)

export default Editor
