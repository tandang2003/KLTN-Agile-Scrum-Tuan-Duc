import * as React from 'react'

import { NavRecent } from '@/components/sidebar/nav-recent'
import { NavUser } from '@/components/sidebar/nav-user'
import { TeamSwitcher } from '@/components/sidebar/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { NavMain } from '@/components/sidebar/nav-main'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  header: {
    name: 'Task Flow',
    logo: Logo
  },
  navMain: {
    items: [
      {
        title: 'Overview',
        url: '#',
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
        url: '#',
        icon: <Icon icon={'carbon:workspace'} />
      },
      {
        title: 'Projects',
        url: '#',
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.header} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain.items} />
        <NavRecent items={data.recent.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
