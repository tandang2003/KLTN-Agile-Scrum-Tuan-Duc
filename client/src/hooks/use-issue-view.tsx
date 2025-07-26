import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentIssue } from '@/feature/issue/issue.slice'
import { enableViewIssue } from '@/feature/trigger/trigger.slice'
import { Id } from '@/types/other.type'

const useOpenIssueView = () => {
  const dispatch = useAppDispatch()

  const handleOpenIssueUpdate = (issueId: Id) => {
    dispatch(setCurrentIssue(issueId))
    dispatch(enableViewIssue())
  }
  return { action: handleOpenIssueUpdate }
}

export default useOpenIssueView
