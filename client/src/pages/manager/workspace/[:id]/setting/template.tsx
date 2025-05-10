import DialogCreateSprint from '@/components/dialog/DialogCreateSprint'
import Icon from '@/components/Icon'
import WorkspaceTemplate from '@/components/workspace/WorkspaceTemplate'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { disableDragMode, enableDragMode } from '@/feature/sprint/sprint.slice'
import { cn } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const TemplateTab = () => {
  const [openDialogCreateSprint, setOpenDialogCreateSprint] =
    useState<boolean>(false)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const isDragMode = useAppSelector((state) => state.sprintSlice.isDragMode)
  const dispatch = useAppDispatch()

  const handleChangedPosition = () => {
    dispatch(disableDragMode())
  }

  const handleCancelPosition = () => {
    dispatch(disableDragMode())
  }

  return (
    <div>
      <div className='flex items-center pb-4'>
        <Button
          variant='default'
          size='sm'
          onClick={() => {
            setOpenDialogCreateSprint(true)
          }}
        >
          <PlusIcon />
          Create Sprint
        </Button>
        <span className='ml-auto'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {!isDragMode && (
                  <Icon
                    icon={'lucide:edit'}
                    className='ml-3 hover:cursor-pointer'
                    onClick={() => {
                      dispatch(enableDragMode())
                    }}
                  />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>Change position sprint</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div
            className={cn(
              'ml-3 items-center p-1',
              !isDragMode ? 'hidden' : 'flex'
            )}
          >
            <Icon
              icon={'lucide:check'}
              className='rounded-l-lg bg-gray-200 px-1.5 text-green-400 transition-colors hover:cursor-pointer hover:bg-green-400 hover:text-white'
              onClick={() => {
                handleChangedPosition()
              }}
            />
            <Icon
              icon={'iconoir:cancel'}
              className='rounded-r-lg bg-gray-200 px-1.5 text-red-400 transition-colors hover:cursor-pointer hover:bg-red-400 hover:text-white'
              onClick={handleCancelPosition}
            />
          </div>
        </span>
      </div>
      {data && (
        <WorkspaceTemplate
          sprints={data}
          onChange={(item, index) => {
            console.log(item)
            console.log(index)
          }}
        />
      )}
      <DialogCreateSprint
        open={openDialogCreateSprint}
        onOpen={setOpenDialogCreateSprint}
      />
    </div>
  )
}

export default TemplateTab
