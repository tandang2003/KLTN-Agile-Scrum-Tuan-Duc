import Icon from '@/components/Icon'
import { MediaPreviewProps } from '@/components/media/media'
import { useMediaContext } from '@/components/media/MediaContext'
import { getFileTypeFromUrl } from '@/lib/file.helper'
import { useMemo } from 'react'

const MediaPreview = ({}: MediaPreviewProps) => {
  const { thumbnail, onDelete, disabled } = useMediaContext()
  if (!thumbnail || !disabled) {
    return null
  }
  const IconMemo = useMemo(() => {
    const type = getFileTypeFromUrl(thumbnail.url)
    switch (type) {
      case 'image':
        return <Icon icon={'mingcute:image-line'} size={50} />
      case 'video':
        return <Icon icon={'mingcute:video-line'} size={50} />
      case 'pdf':
        return <Icon icon={'mingcute:file-pdf-line'} size={50} />
      case 'word':
        return <Icon icon={'mingcute:doc-line'} size={50} />
    }
  }, [thumbnail])
  return (
    <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
      <div className='flex size-[50px] items-center justify-center shadow-md'>
        {IconMemo}
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <span className='line-clamp-1 w-[200px] text-base'>
          {thumbnail.name}
        </span>
      </div>
      <div>
        {onDelete && (
          <div
            className='cancel grid size-[30px] cursor-pointer place-items-center rounded-full'
            onClick={() => onDelete()}
          >
            <Icon icon={'iconoir:xmark'} />
          </div>
        )}
      </div>
    </div>
  )
}

const MediaPreviewNoAction = () => {
  const { thumbnail, disabled } = useMediaContext()
  if (disabled || !thumbnail) {
    return null
  }

  return (
    <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
      <div className='flex size-[50px] items-center justify-center shadow-md'>
        <Icon icon={'mingcute:doc-line'} size={50} />
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <span className='line-clamp-1 w-[200px] text-base'>
          {thumbnail.name}
        </span>
      </div>
    </div>
  )
}

const MediaPreviewEmpty = () => {
  const { disabled, thumbnail } = useMediaContext()
  if (disabled && !thumbnail) {
    return null
  }

  return (
    <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
      <div className='flex size-[50px] items-center justify-center shadow-md'>
        <Icon icon={'mingcute:doc-line'} size={50} />
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <span className='line-clamp-1 w-[200px] text-base'>Empty</span>
      </div>
    </div>
  )
}
export { MediaPreviewEmpty, MediaPreviewNoAction }
export default MediaPreview
