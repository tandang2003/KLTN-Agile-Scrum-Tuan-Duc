import AppSidebar from '@/components/AppSidebar'
import ClockSimulator from '@/components/ClockSimulator'
import RequiredAuthNoRedirect from '@/components/wrapper/RequiredAuthNoRedirect'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
    <AppSidebar>
      <RequiredAuthNoRedirect>
        <ClockSimulator />
      </RequiredAuthNoRedirect>
      <Outlet />
    </AppSidebar>
  )
}

export default ManagerLayout
