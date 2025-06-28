import Icon from '@/components/Icon'
import DialogAddStudent from '@/components/dialog/DialogAddStudent'
import { DialogCreateProject } from '@/components/dialog/DialogCreateProject'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import useAppId from '@/hooks/use-app-id'
import { formatDate } from '@/lib/utils'
import WorkspaceNavigate from '@/pages/manager/workspace/[:id]/navigate'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const WorkspaceDetailPage = () => {
  const { workspaceId, projectId } = useAppId()

  const { data } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })
  const [openDialogAddStudent, setOpenDialogAddStudent] =
    useState<boolean>(false)

  const [openDialogCreateProject, setOpenDialogCreateProject] =
    useState<boolean>(false)

  if (!workspaceId || !data) return null

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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='mb-3 flex items-center justify-between'>
        <WorkspaceNavigate id={workspaceId} />
        <RequiredAuth mode='hide' roles={['student']}>
          {projectId ? (
            <Button variant='default' size='sm' asChild>
              <NavLink to={`/manager/workspace/project/${projectId}`}>
                Your Project
              </NavLink>
            </Button>
          ) : (
            <Button
              variant='default'
              size='sm'
              onClick={() => setOpenDialogCreateProject(true)}
            >
              <PlusIcon />
              New Group
            </Button>
          )}
        </RequiredAuth>
      </div>
      <Outlet />
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
