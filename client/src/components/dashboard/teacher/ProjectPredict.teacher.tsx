import ListViewPagination from '@/components/ListViewPagination'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProjectPredictDisplayName } from '@/constant/message.const'
import { useGetProjectPredictQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { cn, formatDate } from '@/lib/utils'
import { useProjectDashBoard } from '@/pages/manager/workspace/[id]/dashboard/context'
import { PageRequest } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { useState } from 'react'

const ProjectPredict = () => {
  const { workspaceId } = useAppId()

  const { sprint } = useProjectDashBoard()
  const [page, setPage] = useState<PageRequest>({
    page: 0,
    size: 4
  })
  const { data, isFetching } = useGetProjectPredictQuery(
    {
      workspaceId: workspaceId as Id,
      sprintId: sprint?.id,
      page: page
    },
    {
      skip: !workspaceId || sprint?.id == null,
      refetchOnMountOrArgChange: true
    }
  )
  return (
    <div>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Thống kê dự đoán của các project theo sprint hiện tại
      </h2>

      {sprint?.id ? (
        <ListViewPagination
          view={{
            orientation: 'horizontal',
            className: 'gap-5 mt-4',
            loading: isFetching,
            render: (item) => {
              const predict = item.lastTimeSecond
                ? item.predictSecond
                : item.predict
              return (
                <Card
                  key={item.id}
                  className={cn(
                    'w-full max-w-sm',
                    predict == -1 && 'border-2 border-red-500',
                    predict == 0 && 'border-2 border-green-500'
                  )}
                >
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <span>
                        Trạng thái:{' '}
                        {getProjectPredictDisplayName(item.predictSecond)}
                      </span>
                    </div>
                    <p className='pt-4 text-right text-sm text-gray-500'>
                      {item?.lastTimeSecond
                        ? formatDate(item.lastTimeSecond)
                        : item?.lastTime && formatDate(item.lastTime)}
                    </p>
                  </CardContent>
                </Card>
              )
            }
          }}
          page={data}
          onPageChange={(page) => {
            setPage((prev) => ({
              ...prev,
              page: page
            }))
          }}
        />
      ) : (
        <div>
          <div className='text-center text-lg text-red-500'>
            Chưa có sprint nào đang chạy
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPredict
