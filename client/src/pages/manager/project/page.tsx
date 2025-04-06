import React, { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BoardTab from '@/pages/manager/project/tabs/board'
import ProjectHeader from '@/components/project/ProjectHeader'
import clsx from 'clsx'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'

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
    <section className='h-full'>
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

      <Tabs defaultValue='board' className='h-full'>
        <TabsList className='flex gap-4 bg-transparent'>
          <TabsTrigger value='overview' className={classNameTabsTrigger}>
            Overview
          </TabsTrigger>
          <TabsTrigger value='backlog' className={classNameTabsTrigger}>
            Backlog
          </TabsTrigger>
          <TabsTrigger value='timelines' className={classNameTabsTrigger}>
            Timelines
          </TabsTrigger>
          <TabsTrigger value='board' className={classNameTabsTrigger}>
            Board
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='backlog'>Backlog</TabsContent>
        <TabsContent value='timelines'>Change your password here.</TabsContent>
        <TabsContent className='bg-emerald-900' value='board'>
          <ScrollArea className='overflow-x-scroll bg-[F9F8FF] whitespace-nowrap'>
            <BoardTab />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default ProjectPage
