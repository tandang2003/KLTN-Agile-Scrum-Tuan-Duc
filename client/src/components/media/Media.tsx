import { MediaProps, MediaViewProps, Thumbnail } from '@/components/media/media'
import MediaContext from '@/components/media/MediaContext'
import MediaPreview, {
  MediaPreviewEmpty
} from '@/components/media/MediaPreview'
import MediaUploading from '@/components/media/MediaUploading'
import { MAX_SIZE } from '@/constant/app.const'
import { useEffect, useState } from 'react'

const Media = ({
  thumbnail: initialThumbnail,
  onDelete,
  children,
  disabled = false,
  maxSize,
  ...props
}: MediaProps) => {
  if (maxSize && maxSize >= MAX_SIZE) {
    throw new Error(`Maximum size must be less than ${MAX_SIZE} bytes`)
  }
  const [thumbnail, setThumbnail] = useState<Thumbnail | null>(
    initialThumbnail ?? null
  )

  useEffect(() => {
    setThumbnail(initialThumbnail ?? null)
  }, [initialThumbnail])

  const handleSetThumbnail = (file: Thumbnail) => {
    setThumbnail(file)
  }

  const handleDelete = async () => {
    try {
      await onDelete?.()
      setThumbnail(null)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <MediaContext
      value={{
        thumbnail: thumbnail ?? undefined, // ✅ use reactive state
        onDelete: handleDelete,
        setThumbnail: handleSetThumbnail,
        disabled
      }}
    >
      {thumbnail ? (
        <MediaPreview />
      ) : disabled ? (
        <MediaPreviewEmpty />
      ) : (
        <MediaUploading {...props} />
      )}

      {children}
    </MediaContext>
  )
}

const MediaView = ({ thumbnail: initialThumbnail }: MediaViewProps) => {
  const [thumbnail, setThumbnail] = useState<Thumbnail | null>(
    initialThumbnail ?? null
  )

  useEffect(() => {
    setThumbnail(initialThumbnail ?? null)
  }, [initialThumbnail])

  return (
    <MediaContext
      value={{
        thumbnail: thumbnail ?? undefined,
        disabled: false
      }}
    >
      <MediaPreview />
    </MediaContext>
  )
}

export default Media
export { MediaView }
