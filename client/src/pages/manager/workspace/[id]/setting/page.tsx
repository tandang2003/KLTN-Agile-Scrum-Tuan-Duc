import Icon from '@/components/Icon'
import {
  Tabs,
  TabsContent,
  TabsLinkTrigger,
  TabsList
} from '@/components/ui/tabs'
import { useAppSelector } from '@/context/redux/hook'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import SummaryTab from '@/pages/manager/workspace/[id]/summary/page'
import WorkspaceSprintTemplatePage from '@/pages/manager/workspace/[id]/template/page'
import { Id } from '@/types/other.type'
import { useLocation } from 'react-router-dom'

const WorkspaceSettingPage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const location = useLocation()
  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId,
    refetchOnMountOrArgChange: true
  })

  return (
    <div>
      {!isFetching && (
        <div className='relative mt-1 mb-4 flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-gray-100'>
          <Icon icon={'carbon:workspace'} />
          <h2 className='h2'>{data?.name ?? ''}</h2>
        </div>
      )}

      <Tabs defaultValue={'template'}>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsLinkTrigger href={`${location}/summary`}>
              Summary
            </TabsLinkTrigger>
            <TabsLinkTrigger href='/template'>Template</TabsLinkTrigger>
          </TabsList>
        </div>

        <TabsContent value='summary'>
          <SummaryTab />
        </TabsContent>

        <TabsContent value='template'>
          <WorkspaceSprintTemplatePage />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WorkspaceSettingPage
