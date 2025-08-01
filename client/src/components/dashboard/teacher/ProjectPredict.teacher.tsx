import ListViewPagination from '@/components/ListViewPagination'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetProjectPredictQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { formatDate } from '@/lib/utils'
import { PageRequest } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { useState } from 'react'

const ProjectPredict = () => {
  const { workspaceId } = useAppId()

  const { sprint } = useSprintCurrent()
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
              return (
                <Card className='w-full max-w-sm'>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <span>
                        Trạng thái:{' '}
                        {item.predict == -2 && 'Chưa thực hiện dự đoán'}
                        {item.predict == -1 &&
                          'Project có khả năng không thành công ở sprint này'}
                        {item.predict == 0 &&
                          'Project có khả năng thành công ở sprint này'}
                      </span>
                    </div>
                    <p className='pt-4 text-right text-sm text-gray-500'>
                      {item?.lastTime && formatDate(item.lastTime)}
                      {/* {formatDate(new Date())} */}
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
        <div></div>
      )}
    </div>
  )
}

export default ProjectPredict
