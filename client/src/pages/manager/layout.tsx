import AppSidebar from '@/components/AppSidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import UserDropdown from '@/components/UserDropdown'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar className='bg-white' />
      <SidebarInset>
        <div className='relative flex flex-col'>
          <header className='sticky top-0 left-0 z-30 flex h-16 shrink-0 items-center gap-2 bg-white transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex w-full items-center justify-between gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <span className='flex-1'>Search</span>
              <span>
                <UserDropdown className='bg-gray-100 text-black hover:text-white' />
              </span>
            </div>
          </header>
          <div className='flex-1 overflow-y-auto'>
            <div className='h-[calc(100vh-4rem)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-3rem)]'>
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ManagerLayout
