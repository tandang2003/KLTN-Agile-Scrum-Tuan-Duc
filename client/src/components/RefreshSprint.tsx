import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { setSprintFilter } from '@/feature/board/board.slice'
import {
  useClearGetResultMutation,
  useLazyGetProjectQuery
} from '@/feature/project/project.api'
import { setSprintCurrent } from '@/feature/sprint/sprint.slice'
import useAppId from '@/hooks/use-app-id'
import { toISODateString } from '@/lib/date.helper'
import { toast } from 'sonner'

const RefreshSprint = () => {
  const { projectId } = useAppId()
  const dispatch = useAppDispatch()
  const [clear] = useClearGetResultMutation()
  const [trigger] = useLazyGetProjectQuery()
  const handleOnClick = () => {
    if (!projectId) return
    trigger(projectId)
      .unwrap()
      .then((res) => {
        const { currentSprint, nextSprint, prevSprint } = res
        console.log('currentSprint', currentSprint)
        console.log('nextSprint', nextSprint)
        dispatch(
          setSprintCurrent({
            previous: prevSprint
              ? {
                  id: prevSprint.id,
                  start: toISODateString(prevSprint.start),
                  end: toISODateString(prevSprint.end)
                }
              : undefined,
            current: currentSprint
              ? {
                  id: currentSprint.id,
                  start: toISODateString(currentSprint.start),
                  end: toISODateString(currentSprint.end)
                }
              : undefined,
            next: nextSprint
              ? {
                  id: nextSprint.id,
                  start: toISODateString(nextSprint.start),
                  end: toISODateString(nextSprint.end)
                }
              : undefined
          })
        )
        clear().unwrap()
        if (currentSprint) {
          dispatch(
            setSprintFilter({
              id: currentSprint.id,
              start: toISODateString(currentSprint.start),
              end: toISODateString(currentSprint.end)
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
