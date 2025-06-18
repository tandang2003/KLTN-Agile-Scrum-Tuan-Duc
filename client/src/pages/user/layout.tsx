import AppSidebar from '@/components/AppSidebar'
import { useGetUserInfoQuery } from '@/feature/user/user.api'
import { Outlet } from 'react-router-dom'

type UserLayoutProps = {}

const UserLayout = ({}: UserLayoutProps) => {
  const { data } = useGetUserInfoQuery()
  const isLoading = !data
  if (isLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='loading-spinner'></div>
      </div>
    )
  }
  return (
    <AppSidebar>
      <Outlet context={{ user: { ...data, avatar: data.avatar?.url } }} />
    </AppSidebar>
  )
}

export default UserLayout
