import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ListViewProps<T> = {
  data?: T[]
  render: (item: T, index: number) => ReactNode
  loading?: boolean
  loadingComponent?: ReactNode
  orientation?: 'vertical' | 'horizontal'
} & React.ComponentProps<'div'>

const ListView = <T,>({
  data,
  render,
  loading,
  loadingComponent,
  orientation,
  className
}: ListViewProps<T>) => {
  if (loading) {
    return loadingComponent ? (
      loadingComponent
    ) : (
      <Skeleton className='h-[300px] w-full' />
    )
  }
  return (
    <div
      className={cn(
        orientation && orientation === 'horizontal' ? 'flex' : 'flex-col',
        className
      )}
    >
      {data && data.map((item, index) => render(item, index))}
    </div>
  )
}

export default ListView
