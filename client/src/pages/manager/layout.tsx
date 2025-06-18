import AppSidebar from '@/components/AppSidebar'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}

export default ManagerLayout
