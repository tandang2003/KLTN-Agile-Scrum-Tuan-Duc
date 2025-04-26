import * as React from 'react'

import { NavRecent } from '@/components/sidebar/nav-recent'
import { TeamSwitcher } from '@/components/sidebar/team-switcher'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'

import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { NavMain } from '@/components/sidebar/nav-main'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { getUserWorkspaceThunk } from '@/feature/workspace/workspace.slice'
import { RootState } from '@/context/redux/store'

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()
  const state = useAppSelector(
    (state: RootState) => state.workspaceSlice.listItemSideBar
  )
  React.useEffect(() => {
    if (!state) dispatch(getUserWorkspaceThunk())
  }, [dispatch, state])

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
              state?.map((item) => ({
                title: item.name,
                url: `/manager/workspace/project/${item.id}`
              })) ?? []
          },
          {
            title: 'Project',
            url: '/manager/project',
            icon: <Icon icon={'ant-design:project-twotone'} />
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
  }, [state])

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.header} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain.items} />
        <NavRecent items={data.recent.items} />
      </SidebarContent>
    </Sidebar>
  )
}

export default React.memo(AppSidebar)
