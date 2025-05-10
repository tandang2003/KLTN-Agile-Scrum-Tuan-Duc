import Icon from '@/components/Icon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppSelector } from '@/context/redux/hook'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import SummaryTab from '@/pages/manager/workspace/[:id]/setting/summary'
import TemplateTab from '@/pages/manager/workspace/[:id]/setting/template'
import { Id } from '@/types/other.type'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const WorkspaceSettingPage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const navigate = useNavigate()

  const { data, isFetching, isSuccess } = useGetWorkspaceQuery(
    workspaceId as Id,
    {
      skip: !workspaceId
    }
  )

  useEffect(() => {
    if (!workspaceId) return
    if (!isFetching && !isSuccess) {
      navigate('/404')
    }
  }, [navigate, workspaceId, isSuccess, isFetching])

  return (
    <div>
      {!isFetching && (
        <div className='relative mt-1 mb-4 flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-gray-100'>
          <Icon icon={'carbon:workspace'} />
          <h2 className='h2'>{data?.name ?? ''}</h2>
        </div>
      )}

      <Tabs defaultValue={'summary'}>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='summary'>Summary</TabsTrigger>
            <TabsTrigger value='template'>Template</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='summary'>
          <SummaryTab />
        </TabsContent>

        <TabsContent value='template'>
          <TemplateTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WorkspaceSettingPage
