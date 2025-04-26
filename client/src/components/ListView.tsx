import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ListViewProps<T> = {
  data?: T[]
  render: (item: T, index: number) => ReactNode
  loading?: boolean
  loadingComponent?: ReactNode
  orientation?: 'vertical' | 'horizontal'
  display?: 'flex' | 'grid'
  loadingItems?: {
    items: number
    loadingComponent?: ReactNode
  }
} & React.ComponentProps<'div'>

const ListView = <T,>({
  data,
  render,
  loading,
  loadingComponent,
  orientation,
  display = 'flex',
  loadingItems,
  className
}: ListViewProps<T>) => {
  if (loading && !loadingItems) {
    return loadingComponent ? (
      loadingComponent
    ) : (
      <Skeleton className='h-[300px] w-full' />
    )
  }
  return (
    <div
      className={cn(
        display,
        orientation && orientation === 'horizontal' ? 'flex' : 'flex-col',
        className
      )}
    >
      {loading &&
        loadingItems &&
        Array(loadingItems.items)
          .fill(null)
          .map(
            (_, index) =>
              loadingItems.loadingComponent ?? (
                <Skeleton key={index} className='h-[100px] w-full' />
              )
          )}
      {data && data.map((item, index) => render(item, index))}
    </div>
  )
}

export default ListView
