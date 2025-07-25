import Icon from '@/components/Icon'
import { createCtx } from '@/lib/context.helper'
import {
  cloneElement,
  ComponentProps,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import LibDocViewer, {
  IDocument,
  IHeaderOverride,
  MSDocRenderer,
  PDFRenderer,
  PNGRenderer
} from 'react-doc-viewer'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type DocViewerContextType = {
  open: () => void
  close: () => void
  isOpen: boolean
  currentDoc: IDocument | null
}

const [useDocViewerContext, DocViewerContextProvider] =
  createCtx<DocViewerContextType>()

type DocViewerRootProps = {
  document: IDocument
  children: ReactNode
}

const DocViewerRoot = ({ children, document }: DocViewerRootProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDoc, setCurrentDoc] = useState<IDocument | null>(null)

  const open = () => {
    setCurrentDoc(document)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setCurrentDoc(null)
  }

  return (
    <DocViewerContextProvider value={{ open, close, isOpen, currentDoc }}>
      {children}
    </DocViewerContextProvider>
  )
}

type DocViewerTriggerProps = {
  asChild?: boolean
  children: ReactElement<any, any>
}

const DocViewerTrigger = forwardRef<HTMLElement, DocViewerTriggerProps>(
  ({ asChild = false, children }, ref) => {
    const { open } = useDocViewerContext()

    const handleClick = () => {
      open()
    }

    if (asChild) {
      return cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e)
          handleClick()
        },
        ref
      })
    }

    return (
      <div className='cursor-pointer' onClick={handleClick} ref={ref as any}>
        {children}
      </div>
    )
  }
)

DocViewerTrigger.displayName = 'DocViewerTrigger'

export default DocViewerTrigger

const DocViewerHeader: IHeaderOverride = (state) => {
  const { close } = useDocViewerContext()

  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null
  }
  const uri = state.currentDocument.uri || ''
  const fileName = uri.split('/').pop()?.split('?')[0] || 'Untitled'
  return (
    <div className='flex items-center px-4 py-2'>
      <div className='flex-1 font-medium text-gray-800'>{fileName}</div>

      <button
        onClick={close}
        className='hover-opacity grid size-10 place-items-center rounded-full bg-white text-black shadow-md transition'
      >
        <Icon icon={'iconoir:xmark'} className='text-red' size={25} />
      </button>
    </div>
  )
}

const DocViewerContent = () => {
  const { isOpen, currentDoc, close } = useDocViewerContext()

  if (!isOpen || !currentDoc) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 p-4'
      onClick={close}
    >
      <div
        className='relative h-[95vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl'
        onClick={(e) => e.stopPropagation()} // stop click from bubbling up
      >
        <DocViewer
          document={currentDoc}
          style={{ width: '100%', height: '100%' }}
          config={{
            header: {
              overrideComponent: DocViewerHeader
            }
          }}
        />
      </div>
    </div>
  )
}

type DocViewer = {
  document: IDocument
} & Omit<ComponentProps<typeof LibDocViewer>, 'documents'>

const DocViewer = ({ document, ...props }: DocViewer) => {
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <LibDocViewer
        {...props}
        pluginRenderers={[PDFRenderer, PNGRenderer, MSDocRenderer]}
        documents={[document]}
      />
    </div>
  )
}

type FullScreenDocViewerProps = {
  isOpen?: boolean
  onClose?: () => void
} & DocViewer

const FullScreenDocViewer = ({
  onClose,
  isOpen,
  ...props
}: FullScreenDocViewerProps) => {
  // Internal state only used if isOpen is undefined
  const [internalOpen, setInternalOpen] = useState(false)

  const shouldShow = isOpen ?? internalOpen

  // Allow open method when uncontrolled
  const open = () => {
    if (isOpen === undefined) setInternalOpen(true)
  }

  const close = () => {
    if (onClose) onClose()
    else if (isOpen === undefined) setInternalOpen(false)
  }

  // Optional: expose `open` method when uncontrolled
  useEffect(() => {
    if (isOpen === undefined) {
      ;(window as any).openDocViewer = open // dev tool only, not production-safe
    }
  }, [])

  if (!shouldShow) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 p-4'>
      <div className='relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl'>
        {/* Close Button */}
        <button
          onClick={close}
          className='absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md transition hover:bg-gray-100'
        >
          ✕
        </button>

        {/* Document Viewer */}
        <DocViewer {...props} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}

export {
  DocViewerRoot,
  DocViewerTrigger,
  DocViewerContent,
  DocViewer,
  FullScreenDocViewer,
  useDocViewerContext as useDocViewer
}
