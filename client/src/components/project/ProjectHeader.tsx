import Icon from '@/components/Icon'
import Notification from '@/components/notification/Notification'
import DialogInviteStudentProject from '@/components/project/DialogInviteStudentProject'
import DialogStudentProject from '@/components/project/DialogStudentProject'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import messages from '@/constant/message.const'
import { ProjectDetailResponse } from '@/types/project.type'
import { useState } from 'react'

type ProjectHeaderProps = {
  data: ProjectDetailResponse
}

const ProjectHeader = ({ data }: ProjectHeaderProps) => {
  const [open, setIsOpen] = useState<boolean>(false)
  const [openDialogMember, setOpenDialogMember] = useState<boolean>(false)
  return (
    <>
      <div className='flex items-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'>
        <div>
          <span className='text-sm'>{data.id}</span>
          <h2 className='h2'>{data.name}</h2>
        </div>
        <div className='ml-auto flex items-center gap-4'>
          <Notification />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='hover-opacity'>
              <Icon icon={'lucide:more-horizontal'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <RequiredAuth roles={['student']}>
                <DropdownMenuItem
                  className='hover:!bg-yellow-400'
                  onClick={() => setIsOpen(true)}
                >
                  <Icon icon={'fluent-mdl2:add-friend'} />
                  {messages.component.project.header.dropdown.invite}
                </DropdownMenuItem>
              </RequiredAuth>
              <DropdownMenuItem
                className='hover-opacity'
                onClick={() => setOpenDialogMember(true)}
              >
                <Icon icon={'material-symbols:info'} />
                {messages.component.project.header.dropdown.members}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DialogInviteStudentProject open={open} onOpen={setIsOpen} />
      <DialogStudentProject
        data={data}
        open={openDialogMember}
        onOpen={setOpenDialogMember}
      />
    </>
  )
}
export default ProjectHeader
