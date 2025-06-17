import Icon from '@/components/Icon'
import { MediaPreviewProps } from '@/components/media/media'
import { useMediaContext } from '@/components/media/MediaContext'

const MediaPreview = ({}: MediaPreviewProps) => {
  const { thumbnail, onDelete } = useMediaContext()
  if (!thumbnail) {
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
      <div>
        <div
          className='cancel grid size-[30px] cursor-pointer place-items-center rounded-full'
          onClick={() => onDelete?.()}
        >
          <Icon icon={'iconoir:xmark'} />
        </div>
      </div>
    </div>
  )
}

const MediaPreviewNoAction = () => {
  const { thumbnail } = useMediaContext()
  if (!thumbnail) {
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
