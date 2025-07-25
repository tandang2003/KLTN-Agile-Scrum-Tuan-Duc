import LoadingBoundary from '@/components/LoadingBoundary'
import Paging from '@/components/Paging'
import messages from '@/constant/message.const'
import { useGetWorkloadWorkspaceQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import { WorkloadDataItem } from '@/types/dashboard.type'
import { PageRequest } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TasksByStatusPerStudentBarChartProps = {}

const TasksByStatusPerStudentBarChart =
  ({}: TasksByStatusPerStudentBarChartProps) => {
    const message =
      messages.component.dashboard.teacher.tasksByStatusPerStudentBarChart
    const [page, setPage] = useState<PageRequest>({
      page: 0,
      size: 3
    })
    const { workspaceId } = useAppId()
    const { data, isFetching } = useGetWorkloadWorkspaceQuery(
      {
        workspaceId: workspaceId as Id,
        page: page
      },
      {
        skip: !workspaceId
      }
    )
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    const BAR_WIDTH = 80 // px per bar max

    useEffect(() => {
      const update = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth)
        }
      }

      update()
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }, [])

    const chartWidth = Math.max(
      containerWidth,
      (data?.items?.length || 0) * BAR_WIDTH
    )

    return (
      <>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
          {message.title}
        </h2>
        <div ref={containerRef} style={{ width: '100%' }}>
          <div
            style={{
              overflowX: chartWidth > containerWidth ? 'auto' : 'hidden'
            }}
          >
            <div
              style={{
                minWidth: '100%',
                width: `${chartWidth}px`,
                height: '300px'
              }}
            >
              <LoadingBoundary
                isLoading={isFetching}
                data={data}
                fallback={<p>Lỗi</p>}
              >
                {(data) => {
                  return <Chart data={data.items} />
                }}
              </LoadingBoundary>
            </div>
          </div>
          <LoadingBoundary data={data} isLoading={isFetching}>
            {(data) => (
              <Paging
                page={{
                  currentPage: data.currentPage,
                  totalPages: data.totalPages,
                  totalItems: data.totalItems
                }}
                onPageChange={(page) => {
                  setPage((prev) => {
                    return {
                      ...prev,
                      page: page
                    }
                  })
                }}
              />
            )}
          </LoadingBoundary>
        </div>
      </>
    )
  }

type ChartProps = {
  data: WorkloadDataItem[]
}

const Chart = ({ data: student }: ChartProps) => {
  const message =
    messages.component.dashboard.teacher.tasksByStatusPerStudentBarChart

  return (
    <>
      {/* Unified Legend */}
      <div className='mb-4 flex justify-center gap-6 text-sm text-gray-700'>
        <div className='flex items-center gap-2'>
          <span className='block h-3 w-3 rounded-full bg-green-500'></span>
          {message.dataset.labelIssueDone}
        </div>
        <div className='flex items-center gap-2'>
          <span className='block h-3 w-3 rounded-full bg-red-500'></span>
          {message.dataset.labelIssueFailed}
        </div>
      </div>

      {/* Chart Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {student.map((item) => {
          const remaining = item.total - item.done - item.notComplete
          const isAllZero =
            item.done === 0 && item.notComplete === 0 && remaining === 0

          if (isAllZero) {
            return (
              <div
                key={item.assignee.uniId}
                className='flex h-[230px] flex-col items-center justify-center rounded border p-4 text-gray-500'
              >
                <h3 className='mb-2 text-center font-semibold text-gray-700'>
                  {item.assignee.name}
                </h3>
                <p className='text-sm italic'>Chưa ghi nhận được dữ liệu</p>
              </div>
            )
          }

          const chartData = {
            labels: [],
            datasets: [
              {
                data: [item.done, item.notComplete, remaining],
                backgroundColor: ['#10b981', '#ef4444', '#facc15']
              }
            ]
          }

          return (
            <div
              key={item.assignee.uniId}
              className='flex flex-col items-center'
            >
              <h3 className='mb-2 text-center font-semibold text-gray-700'>
                {item.assignee.name}
              </h3>
              <div style={{ width: 180, height: 180 }}>
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const value = tooltipItem.raw
                            const label = ['Done', 'Failed', 'Remaining'][
                              tooltipItem.dataIndex
                            ]
                            return `${label}: ${value}`
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TasksByStatusPerStudentBarChart
