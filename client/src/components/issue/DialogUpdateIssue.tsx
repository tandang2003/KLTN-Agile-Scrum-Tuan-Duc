import DialogController from '@/components/dialog/DialogController'
import Icon from '@/components/Icon'
import UpdateIssueForm from '@/components/issue/UpdateIssueForm'
import LoadingBoundary from '@/components/LoadingBoundary'
import ToolTip from '@/components/Tooltip'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetIssueQuery } from '@/feature/issue/issue.api'
import { disableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { IssueDetailResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const DialogUpdateIssue = () => {
  const id = useAppSelector((state: RootState) => state.issueSlice.current?.id)
  const { isUpdateIssue } = useAppSelector((state) => state.triggerSlice)
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetIssueQuery(
    {
      issueId: id as Id
    },
    {
      skip: !isUpdateIssue || !id
    }
  )
  return (
    <DialogController
      open={isUpdateIssue}
      onOpen={() => {
        dispatch(disableUpdateIssue())
      }}
    >
      <LoadingBoundary<IssueDetailResponse>
        data={data}
        isLoading={isFetching}
        loading={<Skeleton className='h-[200px]' />}
        fallback={<div></div>}
      >
        {(data) => (
          <DialogContent
            className='sm:max-w-[80vw]'
            aria-describedby={undefined}
            close={''}
          >
            <DialogHeader>
              <DialogTitle className='flex items-center justify-between gap-3'>
                <ToolTip
                  trigger={
                    <span className='w-[100px] truncate rounded-md bg-gray-400 p-2 shadow-md'>
                      #{data.id}
                    </span>
                  }
                >
                  {data.id}
                </ToolTip>
                <DialogClose asChild>
                  <Button
                    type='button'
                    variant='secondary'
                    className='p-2 hover:bg-red-600 hover:text-white'
                  >
                    <Icon icon={'iconoir:xmark'} />
                  </Button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>
            <UpdateIssueForm data={data} />
          </DialogContent>
        )}
      </LoadingBoundary>
    </DialogController>
  )
}

export default DialogUpdateIssue
