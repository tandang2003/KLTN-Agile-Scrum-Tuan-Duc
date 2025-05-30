import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
type SectionContainerProps = {
  children: ReactNode
  className?: string
}

const SectionContainer = ({ children, className }: SectionContainerProps) => {
  return <section className={cn('h-full px-4', className)}>{children}</section>
}

export default SectionContainer
