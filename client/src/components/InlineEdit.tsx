import { cn } from '@/lib/utils'
import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

type RenderEditorProps<T> = {
  value: T
  onChange: (value: T) => void
  onBlur: () => void
  onKeyDown?: (e: KeyboardEvent<any>) => void
  ref: RefObject<any>
}

type InlineEditProps<T> = {
  value: T
  validate?: (value: T) => boolean
  onSave: (value: T) => void
  renderEditor: (props: RenderEditorProps<T>) => ReactNode
  displayComponent?: (value: T) => ReactNode
} & HTMLAttributes<HTMLSpanElement>

const InlineEdit = <T,>({
  value: initialValue,
  validate,
  onSave,
  renderEditor,
  displayComponent,
  className,
  ...props
}: InlineEditProps<T>) => {
  const [value, setValue] = useState<T>(initialValue)
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>(null)

  const handleBlur = () => {
    console.log('blur')
    setEditing(false)
    if (value !== initialValue) {
      if (validate && !validate(value)) {
        return
      }
      onSave(value)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<any>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setValue(initialValue)
      setEditing(false)
    }
  }

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      // Move cursor to end (optional)
      if (typeof inputRef.current?.setSelectionRange === 'function') {
        const length = inputRef.current.value?.length || 0
        inputRef.current.setSelectionRange(length, length)
      }
    }
  }, [editing])

  return editing ? (
    renderEditor({
      value,
      onChange: setValue,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      ref: inputRef
    })
  ) : (
    <span
      onClick={() => setEditing(true)}
      style={{ cursor: 'pointer' }}
      className={cn(className)}
      {...props}
    >
      {displayComponent ? displayComponent(value) : (value as ReactNode)}
    </span>
  )
}

export default InlineEdit
