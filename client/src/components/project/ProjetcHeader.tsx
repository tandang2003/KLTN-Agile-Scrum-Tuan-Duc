import Icon from '@/components/Icon'
import DialogInviteStudentProject from '@/components/project/DialogInviteStudentProject'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { ProjectDetailResponse } from '@/types/project.type'
import { useState } from 'react'

type ProjectHeaderProps = {
  data: ProjectDetailResponse
}

const ProjectHeader = ({ data }: ProjectHeaderProps) => {
  const [open, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className='flex items-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'>
        <div>
          <span className='text-sm'>{data.id}</span>
          <h2 className='h2'>{data.name}</h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className='ml-auto'>
            <Icon className='text-white' icon={'lucide:more-horizontal'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Icon icon={'mdi:information'} />
              Information
            </DropdownMenuItem>
            <RequiredAuth roles={['student']}>
              <DropdownMenuItem
                className='hover:!bg-yellow-400'
                onClick={() => setIsOpen(true)}
              >
                <Icon icon={'fluent-mdl2:add-friend'} />
                Invite
              </DropdownMenuItem>
            </RequiredAuth>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogInviteStudentProject open={open} onOpen={setIsOpen} />
    </>
  )
}
export default ProjectHeader
