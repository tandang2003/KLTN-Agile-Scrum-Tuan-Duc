import { cn } from '@/lib/utils'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { ComponentProps, forwardRef } from 'react'

type EditorProps = {
  classNameContainer?: string
} & ComponentProps<typeof ReactQuill>

const Editor = forwardRef<ReactQuill, EditorProps>(
  ({ value = '', onChange, classNameContainer, ...props }, ref) => {
    return (
      <div className={cn('max-w-full overflow-y-auto', classNameContainer)}>
        <ReactQuill {...props} value={value} onChange={onChange} ref={ref} />
      </div>
    )
  }
)

export default Editor
