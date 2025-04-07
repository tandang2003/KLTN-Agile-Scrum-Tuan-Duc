import React, { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BoardPage from '@/pages/manager/project/board/page'
import ProjectHeader from '@/components/project/ProjectHeader'
import clsx from 'clsx'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'
import ProjectNavigation from '@/pages/manager/project/navigation'
import { Outlet } from 'react-router-dom'

const ProjectPage = () => {
  return (
    <section className='h-full px-4'>
      <ProjectHeader
        className='pb-4'
        name='Project 1'
        breadcrumbs={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Project'
          }
        ]}
      />
      <ProjectNavigation />
      <Outlet />
    </section>
  )
}

export default ProjectPage
