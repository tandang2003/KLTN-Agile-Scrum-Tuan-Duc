import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export type ListViewProps<T> = {
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
  append?: ReactNode
} & React.ComponentProps<'div'>

const ListView = <T,>({
  data,
  render,
  loading,
  loadingComponent,
  orientation,
  display = 'flex',
  loadingItems,
  emptyComponent = (
    <div className='grid h-[300px] place-items-center rounded-md bg-gray-300'>
      No result
    </div>
  ),
  className,
  append,
  style
}: ListViewProps<T>) => {
  if (loading && !loadingItems) {
    return loadingComponent ? (
      loadingComponent
    ) : (
      <Skeleton className='h-[300px] w-full' />
    )
  }
  return (
    <>
      <div
        style={style}
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
      {((!loading && !data) || data?.length == 0) && emptyComponent}
      {append && append}
    </>
  )
}

export default ListView
