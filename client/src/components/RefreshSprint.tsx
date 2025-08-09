import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { setSprintCurrent } from '@/feature/sprint/sprint.slice'
import { useLazyGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import useAppId from '@/hooks/use-app-id'
import { toISODateString } from '@/lib/date.helper'
import { toast } from 'sonner'

const RefreshSprint = () => {
  const { workspaceId } = useAppId()
  const dispatch = useAppDispatch()
  const [trigger] = useLazyGetWorkspaceQuery()
  const handleOnClick = () => {
    if (!workspaceId) return
    trigger(workspaceId)
      .unwrap()
      .then((res) => {
        const { currentSprint, nextSprint } = res
        if (currentSprint) {
          const { id, start, end } = currentSprint
          dispatch(
            setSprintCurrent({
              id: id,
              start: toISODateString(start),
              end: toISODateString(end)
            })
          )
          toast.success('Cập nhập sprint hiện tại thành công')
          return
        }
        if (nextSprint) {
          toast.info('Kết thúc môn học', {
            description: 'Tất cả mọi sprint đã kết thúc'
          })
        }
      })
  }
  return <Button onClick={handleOnClick}>Làm mới sprint hiện tại</Button>
}

export default RefreshSprint
