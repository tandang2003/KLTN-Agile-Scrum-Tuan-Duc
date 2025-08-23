import { MediaContextType } from '@/components/media/media'
import { createCtx } from '@/lib/context.helper'

const [useMediaContext, MediaContext] = createCtx<MediaContextType>()

export { useMediaContext }
export default MediaContext
