import DialogCreateSprint from '@/components/dialog/DialogCreateSprint'
import Icon from '@/components/Icon'
import WorkspaceTemplate, {
  WorkspaceTemplateRef
} from '@/components/workspace/WorkspaceTemplate'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import {
  closeDialogCreateSprint,
  disableDragMode,
  enableDragMode,
  openDialogCreateSprint
} from '@/feature/sprint/sprint.slice'
import { cn } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { PlusIcon } from 'lucide-react'
import { useRef } from 'react'

const TemplateTab = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const { isDragMode, isOpenDialogCreate } = useAppSelector(
    (state) => state.sprintSlice
  )
  const workspaceRef = useRef<WorkspaceTemplateRef>(null)

  const dispatch = useAppDispatch()

  const handleChangedPosition = () => {
    dispatch(disableDragMode())
  }

  const handleCancelPosition = () => {
    dispatch(disableDragMode())
    workspaceRef.current?.rollback()
  }

  return (
    <div>
      <div className='flex items-center pb-4'>
        {!isDragMode && (
          <Button
            variant='default'
            size='sm'
            onClick={() => {
              dispatch(openDialogCreateSprint())
            }}
          >
            <PlusIcon />
            Create Sprint
          </Button>
        )}

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
          ref={workspaceRef}
          sprints={data}
          onChange={(item, index) => {
            console.log(item)
            console.log(index)
          }}
        />
      )}
      <DialogCreateSprint
        open={isOpenDialogCreate}
        onOpen={() => dispatch(closeDialogCreateSprint())}
      />
    </div>
  )
}

export default TemplateTab
