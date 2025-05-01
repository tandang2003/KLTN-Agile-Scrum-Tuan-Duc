import { StudentDataTable } from '@/components/datatable/student/StudentDataTable'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icon from '@/components/Icon'
import DialogAddStudent from '@/components/dialog/DialogAddStudent'

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const navigate = useNavigate()
  const { data } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })
  const [openDialogAddStudent, setOpenDialogAddStudent] =
    useState<boolean>(false)

  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }
  }, [navigate, workspaceId])

  if (!workspaceId) return null
  if (!data) return null

  return (
    <div className='px-4'>
      <div className='relative mt-1 mb-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-gray-100'>
        <span className='text-sm font-semibold'># {data.id}</span>
        <h1 className='h1 pb-2'>
          Workspace: <strong>{data.name}</strong>
        </h1>
        <ul className='flex items-center gap-2'>
          <span>Start</span>
          <span className='rounded-xl bg-green-500 px-4 py-2'>
            {formatDate(data.start)}
          </span>
          <span>Current </span>
          <span className='rounded-xl bg-amber-500 px-4 py-2'>
            {formatDate(new Date())}
          </span>
          <span>Start </span>
          <span className='rounded-xl bg-red-500 px-4 py-2'>
            {formatDate(data.end)}
          </span>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger className='absolute top-5 right-5'>
            <Icon icon={'lucide:more-horizontal'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpenDialogAddStudent((state) => !state)}
            >
              <Icon icon={'hugeicons:student'} />
              Add Student
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:!bg-blue-400'>
              <Icon icon={'mdi:information'} />
              Information
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:!bg-yellow-400'>
              <Icon icon={'solar:pen-bold'} />
              Change
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs defaultValue='project'>
        <TabsList>
          <TabsTrigger value='project'>Project</TabsTrigger>
          <TabsTrigger value='student'>Student</TabsTrigger>
        </TabsList>
        <TabsContent value='student'>
          <StudentDataTable workspaceId={workspaceId} />
        </TabsContent>
        <TabsContent value='project'></TabsContent>
      </Tabs>
      <DialogAddStudent
        open={openDialogAddStudent}
        onOpen={setOpenDialogAddStudent}
      />
    </div>
  )
}

export default WorkspaceDetailPage
