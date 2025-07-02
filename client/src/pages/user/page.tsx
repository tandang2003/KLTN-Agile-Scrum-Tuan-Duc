import { Badge } from '@/components/ui/badge'
import messages, { getRoleDisplayName } from '@/constant/message.const'
import UserAvatar from '@/pages/user/avatar'
import UserNavigate from '@/pages/user/navigate'
import UserWorkspace from '@/pages/user/workspace'
import { UserLayoutContextType } from '@/types/route.type'

import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

const UserPage = () => {
  return (
    <section className='container-sidebar'>
      <div className='h-[200px] rounded-md bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'></div>
      <div className='mt-5 flex gap-3'>
        <div className='border-accent relative flex-1/3 rounded-md border-2 px-4 py-2 shadow'>
          <div className='-mt-[100px]'>
            <UserAvatar />
          </div>
          <Info />
        </div>
        <div className='flex-2/3'>
          <UserWorkspace />
        </div>
      </div>
      <div className='mt-10 p-2'>
        <UserNavigate />
        <div className='mt-2 rounded-md border-2 shadow-md'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

const Info = () => {
  const { user } = useOutletContext<UserLayoutContextType>()

  return (
    <div className='rounded-md'>
      <LineUserInfo title={messages.user.info.name} value={user.name} />
      <LineUserInfo title={messages.user.info.uniId} value={`${user.uniId}`} />
      <LineUserInfo
        title={messages.user.info.role}
        value={<Badge role={user.role}>{getRoleDisplayName(user.role)}</Badge>}
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
