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
  onCancel: () => void
  ref: RefObject<any>
}

type InlineEditProps<T> = {
  value?: T
  validate?: (value: T) => boolean
  onSave: (value: T) => void
  renderEditor: (props: RenderEditorProps<T>) => ReactNode
  displayComponent?: (value: T) => ReactNode
  onChange?: (value: T) => void
} & Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'>

const InlineEdit = <T,>({
  value: controlledValue,
  validate,
  onSave,
  renderEditor,
  displayComponent,
  className,
  onChange: controlledOnChange,
  ...props
}: InlineEditProps<T>) => {
  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined

  const [internalValue, setInternalValue] = useState<T>(controlledValue!)
  const value = isControlled ? controlledValue! : internalValue
  const setValue = isControlled ? controlledOnChange! : setInternalValue

  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>(null)

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(controlledValue!)
    }
  }, [controlledValue])

  const handleBlur = () => {
    setEditing(false)
    if (value !== controlledValue) {
      if (validate && !validate(value)) {
        return
      }
      onSave(value)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    if (!isControlled) {
      setInternalValue(controlledValue!)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<any>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      handleCancel()
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
      onCancel: handleCancel,
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
