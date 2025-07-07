import SprintCollection from '@/components/dashboard/SprintCollection'
import messages from '@/constant/message.const'
import { ReactNode } from 'react'
type ProjectDashBoardProps = {
  children: ReactNode
}

const ProjectDashBoard = () => {
  return (
    <section>
      <Card />
      <div className='mt-3'>
        <SprintCollection />
      </div>
    </section>
  )
}

const Card = () => {
  return (
    <div className='flex items-center gap-10'>
      <div className='flex min-h-[80px] items-end gap-4 rounded-md border-2 bg-blue-400 px-4 pt-2 pb-4 text-white shadow'>
        <span className='text-xl'>Tổng số sprint</span>
        <span className='text-4xl'>8</span>
      </div>
      <div className='flex min-h-[80px] items-end gap-4 rounded-md border-2 bg-green-400 px-4 pt-2 pb-4 text-white shadow'>
        <span className='text-2xl'>Số sprint thành công</span>
      </div>
      <div className='flex min-h-[80px] items-end gap-4 rounded-md border-2 bg-red-400 px-4 pt-2 pb-4 text-white shadow'>
        <span className='text-2xl'>Số sprint thất bại</span>
      </div>
    </div>
  )
}

export default ProjectDashBoard
