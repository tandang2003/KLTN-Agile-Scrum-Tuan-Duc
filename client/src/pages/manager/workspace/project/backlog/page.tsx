import DialogCreateIssue from '@/components/issue/DialogCreateIssue'
import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import DialogViewIssue from '@/components/issue/DialogViewIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import SprintAccordion from '@/components/sprint/SprintAccordion'
import messages from '@/constant/message.const'
import {
  useGetProjectQuery,
  useGetResultQuery
} from '@/feature/project/project.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
import { SprintResultResponse } from '@/types/sprint.type'

const BacklogPage = () => {
  const { projectId } = useAppId()
  const { data, isFetching } = useGetResultQuery(
    {
      projectId: projectId as Id
    },
    {
      skip: !projectId
    }
  )

  return (
    <>
      <LoadingBoundary<SprintResultResponse[]>
        data={data}
        isLoading={isFetching}
        fallback={<div>{messages.manager.project.backlog.list.empty}</div>}
      >
        {(data) => <SprintAccordion sprints={data} />}
      </LoadingBoundary>
      <DialogCreateIssue />
      <DialogUpdateIssue />
      <DialogViewIssue />
    </>
  )
}

export default BacklogPage
