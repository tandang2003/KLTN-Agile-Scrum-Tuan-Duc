import DialogCreateIssue from '@/components/issue/DialogCreateIssue'
import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import DialogViewIssue from '@/components/issue/DialogViewIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import SprintAccordion from '@/components/sprint/SprintAccordion'
import messages from '@/constant/message.const'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'

const BacklogPage = () => {
  const { workspaceId } = useAppId()
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <>
      <LoadingBoundary<SprintModel[]>
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
