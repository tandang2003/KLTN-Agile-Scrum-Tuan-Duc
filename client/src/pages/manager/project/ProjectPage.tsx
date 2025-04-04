import React, { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectCardTabs from '@/pages/manager/project/ProjectCardTabs'
import ProjectHeader from '@/components/project/ProjectHeader'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'
import clsx from 'clsx'

const ProjectPage = () => {
  const classNameTabsTrigger = useMemo(() => {
    return clsx(
      'text-md rounded-none border-0 px-4 py-2',
      'data-[state=active]:border-b-3',
      'data-[state=active]:border-solid',
      'data-[state=active]:border-blue-500',
      'hover:cursor-pointer',
      'data-[state=active]:cursor-default'
    )
  }, [])

  return (
    <section>
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

      <Tabs defaultValue='cards'>
        <TabsList className='flex gap-4 bg-transparent'>
          <TabsTrigger value='overview' className={classNameTabsTrigger}>
            Overview
          </TabsTrigger>
          <TabsTrigger value='tasks' className={classNameTabsTrigger}>
            Tasks
          </TabsTrigger>
          <TabsTrigger value='timelines' className={classNameTabsTrigger}>
            Timelines
          </TabsTrigger>
          <TabsTrigger value='cards' className={classNameTabsTrigger}>
            Cards
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='tasks'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='timelines'>Change your password here.</TabsContent>
        <TabsContent value='cards'>
          <ScrollArea className='overflow-x-scroll bg-[F9F8FF] whitespace-nowrap'>
            <ProjectCardTabs />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default ProjectPage
