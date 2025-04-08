import { AppSidebar } from '@/components/AppSidebar'
import ManagerHeader from '@/components/manager/ManagerHeader'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className='overflow-x-hidden'>
        <div className='flex flex-col'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex w-full items-center justify-between gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <span className='flex-1'>Search</span>
              <span>
                <ManagerHeader
                  user={{
                    avatar: '',
                    email: 'ducvui2003',
                    name: 'Le Anh Duc'
                  }}
                />
              </span>
            </div>
          </header>
          <div className='flex-1'>
            <div className='h-[calc(100vh-4rem)] overflow-hidden group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-3rem)]'>
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ManagerLayout
