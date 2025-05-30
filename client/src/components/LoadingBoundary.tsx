import { ReactNode } from 'react'

type Falsy = false | 0 | '' | null | undefined

type LoadingBoundaryProps<T> = {
  data: T | Falsy
  isLoading?: boolean
  loading?: ReactNode
  fallback: ReactNode
  children: (data: T) => ReactNode
}

const LoadingBoundary = <T,>({
  data,
  isLoading,
  loading,
  fallback,
  children
}: LoadingBoundaryProps<T>) => {
  if (isLoading) return <>{loading}</>
  if (data) return <>{children(data)}</>
  else return <>{fallback}</>
}

export default LoadingBoundary
