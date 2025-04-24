import { ReactNode } from 'react'
type SectionContainerProps = {
  children: ReactNode
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <section className='h-full px-4'>{children}</section>
}

export default SectionContainer
