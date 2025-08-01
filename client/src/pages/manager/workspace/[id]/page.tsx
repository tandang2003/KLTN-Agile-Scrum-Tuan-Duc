import Icon from '@/components/Icon'
import DialogAddStudent from '@/components/dialog/DialogAddStudent'
import { DialogCreateProject } from '@/components/project/DialogCreateProject'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import WorkspaceCourseCheckLayer from '@/components/workspace/WorkspaceCourseCheckLayer'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import messages from '@/constant/message.const'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import useAppId from '@/hooks/use-app-id'
import WorkspaceNavigate from '@/pages/manager/workspace/[id]/navigate'
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
        <span className='text-sm font-semibold'>#{data.id}</span>
        <h1 className='h1 pb-2'>
          <strong>{data.name}</strong>
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger className='absolute top-5 right-5'>
            <Icon icon={'lucide:more-horizontal'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <RequiredAuth roles={['teacher']}>
              <DropdownMenuLabel>
                {messages.manager.workspace.detail.options.teacher.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenDialogAddStudent((state) => !state)}
              >
                <Icon icon={'hugeicons:student'} />
                {messages.manager.workspace.detail.options.teacher.addStudent}
              </DropdownMenuItem>
            </RequiredAuth>
            <RequiredAuth roles={['student']}>
              <DropdownMenuItem disabled>
                {messages.manager.workspace.detail.options.empty}
              </DropdownMenuItem>
            </RequiredAuth>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='mb-3 flex items-center justify-between'>
        <WorkspaceNavigate id={workspaceId} />
        <RequiredAuth mode='hide' roles={['student']}>
          {projectId ? (
            <Button
              variant='default'
              size='lg'
              className='active-bg text-md'
              asChild
            >
              <NavLink to={`/manager/workspace/project/${projectId}`}>
                {messages.manager.workspace.detail.project.me}
              </NavLink>
            </Button>
          ) : (
            <Button
              variant='default'
              size='sm'
              onClick={() => setOpenDialogCreateProject(true)}
            >
              <PlusIcon />
              {messages.manager.workspace.detail.project.create}
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
      <RequiredAuth roles={['student']} mode='hide'>
        <WorkspaceCourseCheckLayer
          workspaceId={workspaceId}
          course={data.course}
          prerequisiteCourse={data.prerequisiteCourse}
        />
      </RequiredAuth>
    </div>
  )
}

export default WorkspaceDetailPage
