import { cn } from '@/lib/utils'
import { ReactElement, RefObject, useEffect, useRef, useState } from 'react'

type InfiniteScrollListProps<T> = {
  initialValue?: T[]

  pageStart?: number

  loadFunc: (page: number) => Promise<{
    data: T[]
    more: boolean
  }>

  refViewport?: RefObject<Element | null>

  render: (data: T, index: number) => ReactElement
  className?: string

  loading?: ReactElement
  fallback?: ReactElement
}

export default function InfiniteScrollList<T>({
  initialValue = [],
  pageStart = 1,
  loadFunc,
  render,
  className,
  fallback,
  loading,
  refViewport
}: InfiniteScrollListProps<T>) {
  const [items, setItems] = useState<any[]>(initialValue)
  const [page, setPage] = useState(pageStart)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: '100px', root: refViewport?.current, threshold: 0 } // triggers early
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasMore])

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  useEffect(() => {
    const loadData = async () => {
      console.log('Calling loadFunc for page:', page)
      setIsLoading(true)
      try {
        const { data, more } = await loadFunc(page)
        console.log('Fetched data:', data, 'Has more:', more)
        setItems((prev) => [...prev, ...data])
        setHasMore(more)
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [page])

  return (
    <div>
      {!isLoading && items.length === 0 && fallback}

      <div className={cn(className)}>
        {items.map((item, index) => render(item, index))}
      </div>
      <div ref={loaderRef} className='h-10 w-full' />

      {isLoading && loading}
    </div>
  )
}
