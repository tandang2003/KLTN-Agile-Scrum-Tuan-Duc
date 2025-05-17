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
  emptyComponent?: ReactNode
} & React.ComponentProps<'div'>

const ListView = <T,>({
  data,
  render,
  loading = true,
  loadingComponent = <Skeleton className='h-[300px] w-full bg-red-200' />,
  orientation,
  display = 'flex',
  loadingItems,
  emptyComponent = <div>No result</div>,
  className
}: ListViewProps<T>) => {
  if (loading) {
    return loadingComponent
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

      {((loading && !data) || data?.length == 0) && emptyComponent}
    </div>
  )
}

export default ListView
