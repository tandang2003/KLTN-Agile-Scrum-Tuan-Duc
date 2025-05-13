import { StudentDataTable } from '@/components/datatable/student/StudentDataTable'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
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
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogCreateProject } from '@/components/dialog/DialogCreateProject'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import { ProjectDataTable } from '@/components/datatable/project/ProjectDataTable'

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })
  const [openDialogAddStudent, setOpenDialogAddStudent] =
    useState<boolean>(false)

  const [openDialogCreateProject, setOpenDialogCreateProject] =
    useState<boolean>(false)

  const { user } = useAppSelector((state) => state.authSlice)

  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }
    dispatch(setCurrentWorkspaceId(workspaceId))
  }, [navigate, workspaceId, dispatch])

  if (!workspaceId) return null
  if (!data) return null

  return (
    <div className='container-sidebar'>
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
          <span>End </span>
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
            <RequiredAuth roles={['teacher']}>
              <DropdownMenuItem
                onClick={() => setOpenDialogAddStudent((state) => !state)}
              >
                <Icon icon={'hugeicons:student'} />
                Add Student
              </DropdownMenuItem>
            </RequiredAuth>
            <DropdownMenuItem className='hover:!bg-blue-400'>
              <Icon icon={'mdi:information'} />
              Information
            </DropdownMenuItem>
            <RequiredAuth roles={['teacher']}>
              <DropdownMenuItem className='hover:!bg-yellow-400' asChild>
                <NavLink to={`${location.pathname}/setting`}>
                  <Icon icon={'solar:pen-bold'} />
                  Change
                </NavLink>
              </DropdownMenuItem>
            </RequiredAuth>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs defaultValue={user?.role === 'teacher' ? 'project' : 'student'}>
        <div className='flex items-center justify-between'>
          <TabsList>
            <RequiredAuth mode='hide' roles={['teacher']}>
              <TabsTrigger value='project'>Project</TabsTrigger>
            </RequiredAuth>
            <TabsTrigger value='student'>Student</TabsTrigger>
          </TabsList>
          <Button
            variant='default'
            size='sm'
            onClick={() => setOpenDialogCreateProject(true)}
          >
            <PlusIcon />
            New Group
          </Button>
        </div>
        <RequiredAuth mode='hide' roles={['teacher']}>
          <TabsContent value='project'>
            <ProjectDataTable workspaceId={workspaceId} />
          </TabsContent>
        </RequiredAuth>
        <TabsContent value='student'>
          <StudentDataTable workspaceId={workspaceId} />
        </TabsContent>
      </Tabs>
      <DialogAddStudent
        open={openDialogAddStudent}
        onOpen={setOpenDialogAddStudent}
        workspaceId={workspaceId}
      />
      <DialogCreateProject
        open={openDialogCreateProject}
        onOpen={setOpenDialogCreateProject}
      />
    </div>
  )
}

export default WorkspaceDetailPage
