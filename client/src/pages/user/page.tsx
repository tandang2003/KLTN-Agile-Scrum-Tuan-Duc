import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import UserSkill from '@/pages/user/skill'
import UserWorkspace from '@/pages/user/workspace'
import { ManagerLayoutContextType } from '@/types/route.type'

import { ReactNode } from 'react'
import { useOutletContext } from 'react-router-dom'

const UserPage = () => {
  const { user } = useOutletContext<ManagerLayoutContextType>()

  return (
    <section className='container-sidebar'>
      <div className='h-[200px] rounded-md bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'></div>
      <div className='mt-5 flex gap-3'>
        <div className='border-accent relative flex-1/3 rounded-md border-2 px-4 py-2 shadow'>
          <span className='mt-[100px] block'></span>
          <Avatar className='absolute top-[-100px] ml-[50px] size-[200px]'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Info />
        </div>
        <div className='flex-2/3'>
          <UserWorkspace />
        </div>
      </div>
      <div className='mt-10 border-2 p-2 shadow-md'>
        <UserSkill />
      </div>
    </section>
  )
}

const Info = () => {
  const { user } = useOutletContext<ManagerLayoutContextType>()

  return (
    <div className='mt-3 rounded-md'>
      <LineUserInfo title='Full name' value={user.name} />
      <LineUserInfo title='User Id' value={`#${user.uniId}`} />
      <LineUserInfo
        title='Role'
        value={<Badge role={user.role}>{user.role}</Badge>}
      />
    </div>
  )
}

type LineUserInfoProps = {
  title: ReactNode
  value: ReactNode
}

const LineUserInfo = ({ title, value }: LineUserInfoProps) => {
  return (
    <div className='flex border-b-2 border-gray-300 py-2'>
      <span className='basis-[100px]'>{title}</span>
      <span>{value}</span>
    </div>
  )
}

export default UserPage
