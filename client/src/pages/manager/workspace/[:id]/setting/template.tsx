import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import SprintTemplate, {
  WorkspaceTemplateRef
} from '@/components/sprint/template/SprintTemplate'
import SprintTemplateDialog from '@/components/sprint/template/SprintTemplateDialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import {
  useGetListSprintQuery,
  useUpdateSprintMutation
} from '@/feature/sprint/sprint.api'
import {
  closeDialogCreateSprint,
  disableDragMode,
  enableDragMode,
  openDialogCreateSprint
} from '@/feature/sprint/sprint.slice'
import { sortSprintsByPosition } from '@/lib/board'
import { WEIGHT_POSITION } from '@/lib/const'
import { cn } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { isEqual } from 'lodash'
import { PlusIcon } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'sonner'

const TemplateTab = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const { isDragMode, isOpenDialogCreate: open } = useAppSelector(
    (state) => state.sprintSlice
  )
  const workspaceRef = useRef<WorkspaceTemplateRef>(null)
  const [updateSprint] = useUpdateSprintMutation()
  const dispatch = useAppDispatch()
  const listSprintRef = useRef<SprintModel[]>([])

  const handleChangedPosition = () => {
    // update in api
    if (!listSprintRef.current) return
    const listBeforeUpdate = sortSprintsByPosition(data ?? [])
    const listAfterUpdate = listSprintRef.current
    // console.log('listBeforeUpdate', listBeforeUpdate)
    // console.log('listAfterUpdate', listAfterUpdate)
    const sprintsChange: SprintModel[] = []
    for (let i = 0; i < listAfterUpdate.length; i++) {
      const itemAfter = listAfterUpdate[i]
      const itemBefore = listBeforeUpdate[i]
      if (isEqual(itemAfter, itemBefore)) continue
      sprintsChange.push(itemAfter)
    }
    if (sprintsChange.length === 0) return
    const positionsConverted = sprintsChange
      .map((item, _) => item.position / WEIGHT_POSITION)
      .sort((a, b) => a - b)

    const sprintChangePosition = sprintsChange.map((item, index) => {
      const cloned = { ...item }
      cloned.position = positionsConverted[index] * WEIGHT_POSITION
      return cloned
    })
    // console.log('sprintChangePosition', sprintChangePosition)
    handleUpdateSprint(sprintChangePosition)
    dispatch(disableDragMode())
  }

  const handleUpdateSprint = (sprintsUpdated: SprintModel[]) => {
    if (!sprintsUpdated || sprintsUpdated.length === 0) return
    const promises = sprintsUpdated.map((sprint) => {
      return updateSprint({
        id: sprint.id,
        title: sprint.title,
        position: sprint.position,
        start: sprint.start,
        end: sprint.end,
        minimumStoryPoint: sprint.minimumStoryPoint,
        predict: sprint.predict
      }).unwrap()
    })

    Promise.all(promises)
      .then(() => {
        toast.success('Update sprints success')
        dispatch(disableDragMode())
        workspaceRef.current?.rollback()
      })
      .catch((error) => {
        console.error('Failed to update sprints:', error)
        toast.error('Update sprints error')
      })
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
      <LoadingBoundary<SprintModel[]>
        data={data}
        isLoading={isFetching}
        fallback={'No sprint found'}
      >
        {(data) => {
          return (
            <SprintTemplate
              ref={workspaceRef}
              sprints={data}
              onChange={(newItems) => {
                listSprintRef.current = newItems
              }}
            />
          )
        }}
      </LoadingBoundary>
      <SprintTemplateDialog
        open={open}
        onOpen={() => dispatch(closeDialogCreateSprint())}
      />
    </div>
  )
}

export default TemplateTab
