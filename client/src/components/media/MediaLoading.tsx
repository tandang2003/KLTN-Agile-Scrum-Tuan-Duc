import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode } from 'react'
type MediaLoadingProps = {
  children: ReactNode
}

const MediaLoading = () => {
  return <Skeleton className='h-[50px] w-full' />
}

export default MediaLoading
