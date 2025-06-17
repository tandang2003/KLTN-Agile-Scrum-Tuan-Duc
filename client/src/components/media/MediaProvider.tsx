import { MediaProviderProps, Thumbnail } from '@/components/media/media'
import MediaContext from '@/components/media/MediaContext'
import MediaPreview, {
  MediaPreviewEmpty,
  MediaPreviewNoAction
} from '@/components/media/MediaPreview'
import MediaUploading from '@/components/media/MediaUploading'
import { useEffect, useState } from 'react'

const MediaProvider = ({
  thumbnail: initialThumbnail,
  onDelete,
  children,
  disabled = false,
  ...props
}: MediaProviderProps) => {
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
    <MediaContext.Provider
      value={{
        thumbnail: thumbnail ?? undefined, // ✅ use reactive state
        onDelete: handleDelete,
        setThumbnail: handleSetThumbnail,
        disabled
      }}
    >
      {disabled && !thumbnail && <MediaPreviewEmpty />}
      {disabled && thumbnail && <MediaPreviewNoAction />}
      {!thumbnail && !disabled && <MediaUploading {...props} />}
      {thumbnail && !disabled && <MediaPreview />}
      {/* Render children components */}
      {children}
    </MediaContext.Provider>
  )
}

export default MediaProvider
