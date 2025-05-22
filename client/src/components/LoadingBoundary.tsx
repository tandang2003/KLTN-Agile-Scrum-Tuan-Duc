import { ReactNode } from 'react'

type Falsy = false | 0 | '' | null | undefined | any[]

type LoadingBoundaryProps = {
  isLoading?: boolean
  fallbackCondition?: boolean | Falsy
  loading?: ReactNode
  fallback: ReactNode
  children: ReactNode
}

const LoadingBoundary = ({
  isLoading,
  fallbackCondition,
  loading,
  fallback,
  children
}: LoadingBoundaryProps) => {
  if (isLoading) return <>{loading}</>
  if (fallbackCondition) return <>{fallback}</>
  return <>{children}</>
}

export default LoadingBoundary
