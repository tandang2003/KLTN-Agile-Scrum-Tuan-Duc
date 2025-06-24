import * as React from 'react'

import { TeamSwitcher } from '@/components/sidebar/team-switcher'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'

import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { NavMain } from '@/components/sidebar/nav-main'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import UserDropdown from '@/components/UserDropdown'
import { useGetListWorkspaceQuery } from '@/feature/workspace/workspace.api'

function AppSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: workspaces } = useGetListWorkspaceQuery({
    page: 0,
    size: 1
  })

  const data = React.useMemo(() => {
    return {
      header: {
        name: 'Task Flow',
        logo: Logo
      },
      navMain: {
        items: [
          {
            title: 'Overview',
            url: '/manager',
            isActive: true,
            icon: <Icon icon={'lucide:album'} />,
            items: [
              {
                title: 'History',
                url: '#'
              },
              {
                title: 'Starred',
                url: '#'
              },
              {
                title: 'Settings',
                url: '#'
              }
            ]
          },
          {
            title: 'Workspaces',
            url: '/manager/workspace',
            icon: <Icon icon={'carbon:workspace'} />,
            items:
              workspaces?.items
                ?.filter((item) => item)
                .map(
                  (item) =>
                    item && {
                      title: item.name,
                      url: `/manager/workspace/${item.id}`
                    }
                ) ?? []
          }
        ]
      },
      recent: {
        items: [
          {
            name: 'Workspaces',
            url: '#'
          }
        ]
      }
    }
  }, [workspaces])

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <TeamSwitcher team={data.header} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain.items} />
        </SidebarContent>
      </Sidebar>
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
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default React.memo(AppSidebar)
