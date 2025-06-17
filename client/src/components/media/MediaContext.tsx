import { MediaContextType } from '@/components/media/media'
import { createContext, useContext } from 'react'

const MediaContext = createContext<MediaContextType | null>(null)

const useMediaContext = (): MediaContextType => {
  const context = useContext(MediaContext)
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider')
  }
  return context
}
export { useMediaContext }
export type { MediaContextType }
export default MediaContext
