import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { setSprintFilter } from '@/feature/board/board.slice'
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
        const { currentSprint, nextSprint, prevSprint } = res
        if (currentSprint) {
          const { id, start, end } = currentSprint
          dispatch(
            setSprintCurrent({
              previous: prevSprint
                ? {
                    id: prevSprint.id,
                    start: toISODateString(prevSprint.start),
                    end: toISODateString(prevSprint.end)
                  }
                : undefined,
              current: {
                id: id,
                start: toISODateString(start),
                end: toISODateString(end)
              },
              next: nextSprint
                ? {
                    id: nextSprint.id,
                    start: toISODateString(nextSprint.start),
                    end: toISODateString(nextSprint.end)
                  }
                : undefined
            })
          )
          dispatch(
            setSprintFilter({
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
  return (
    <Button onClick={handleOnClick}>
      <Icon size={20} icon={'material-symbols:refresh'} />
    </Button>
  )
}

export default RefreshSprint
