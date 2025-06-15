import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentIssue } from '@/feature/issue/issue.slice'
import { enableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { Id } from '@/types/other.type'

const useOpenIssueUpdate = () => {
  const dispatch = useAppDispatch()

  const handleOpenIssueUpdate = (issueId: Id) => {
    dispatch(setCurrentIssue(issueId))
    dispatch(enableUpdateIssue())
  }
  return { action: handleOpenIssueUpdate }
}

export default useOpenIssueUpdate
