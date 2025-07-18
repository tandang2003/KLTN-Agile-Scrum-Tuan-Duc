import { ReactNode } from 'react'
type HeadingDashboardProps = {
  children: ReactNode
}

const HeadingDashboard = ({ children }: HeadingDashboardProps) => {
  return (
    <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
      {children}
    </h2>
  )
}

export default HeadingDashboard
