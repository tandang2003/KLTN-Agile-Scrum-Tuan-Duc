import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectCards from '@/pages/manager/ProjectCards'
const ProjectManagerPage = () => {
  return (
    <section>
      <Tabs defaultValue='tasks' className='w-full mx-2 mt-2'>
        <TabsList className='flex gap-4 rounded-xs '>
          <TabsTrigger value='overview' className='py-2 px-4 rounded-xs text-md'>
            Overview
          </TabsTrigger>
          <TabsTrigger value='tasks' className='py-2 px-4 rounded-xs  text-md'>
            Tasks
          </TabsTrigger>
          <TabsTrigger value='timelines' className='py-2 px-4 rounded-xs  text-md'>
            Timelines
          </TabsTrigger>
          <TabsTrigger value='cards' className='py-2 px-4 rounded-xs  text-md'>
            Cards
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>Make changes to your account here.</TabsContent>
        <TabsContent value='tasks'>Make changes to your account here.</TabsContent>
        <TabsContent value='timelines'>Change your password here.</TabsContent>
        <TabsContent value='cards'>
          <ProjectCards />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default ProjectManagerPage
