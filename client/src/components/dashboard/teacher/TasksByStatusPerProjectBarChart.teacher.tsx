import LoadingBoundary from '@/components/LoadingBoundary'
import Paging from '@/components/Paging'
import { Separator } from '@/components/ui/separator'
import { color } from '@/constant/app.const'
import messages from '@/constant/message.const'
import { useGetProjectWorkspaceQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import { ProjectWorkloadRes } from '@/types/dashboard.type'
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
import { useEffect, useRef, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TasksByStatusPerProjectBarChartProps = {}

const TasksByStatusPerProjectBarChart =
  ({}: TasksByStatusPerProjectBarChartProps) => {
    const message =
      messages.component.dashboard.teacher.tasksByStatusPerProjectBarChart
    const { workspaceId } = useAppId()
    const [page, setPage] = useState<PageRequest>({
      page: 0,
      size: 4
    })
    const { data, isFetching } = useGetProjectWorkspaceQuery(
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
                width: `${chartWidth}px`
              }}
            >
              <LoadingBoundary
                data={data}
                isLoading={isFetching}
                fallback={<p>Lỗi</p>}
              >
                {(data) => {
                  return (
                    <>
                      <div>
                        <ChartStatusPerProject data={data.items} />
                        <Separator className='my-4' />
                        <Chart data={data.items} />
                      </div>
                      <Paging
                        page={{
                          currentPage: data.currentPage,
                          totalPages: data.totalPages,
                          totalItems: data.totalItems
                        }}
                        onPageChange={(page) => {
                          setPage((prev) => ({
                            ...prev,
                            page: page
                          }))
                        }}
                      />
                    </>
                  )
                }}
              </LoadingBoundary>
            </div>
          </div>
        </div>
      </>
    )
  }

type ChartProps = {
  data: ProjectWorkloadRes[]
}

const Chart = ({ data }: ChartProps) => {
  const labels = data.map((issue) => issue.name)
  const dataChart = {
    labels: labels,
    datasets: [
      {
        label: 'Tổng cộng',
        data: data.map((item) => item.total),
        backgroundColor: color.stats['total']
      },
      {
        label: 'Hoàn thành',
        data: data.map((item) => item.done),
        backgroundColor: color.stats['done']
      },
      {
        label: 'Chưa hoàn thành',
        data: data.map((item) => item.notComplete),
        backgroundColor: color.stats['not-done']
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false,
        text: 'Tasks by Status per Project'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Issue'
        },
        beginAtZero: true
      }
    }
  }
  return <Bar height={100} options={options} data={dataChart} />
}

type ChartStatusPerProjectProps = {
  data: Array<Pick<ProjectWorkloadRes, 'id' | 'name' | 'status'>>
}

const ChartStatusPerProject = ({
  data: student
}: ChartStatusPerProjectProps) => {
  const message =
    messages.component.dashboard.teacher.tasksByStatusPerProjectBarChart

  return (
    <>
      <div className='mb-4 flex justify-center gap-6 text-sm text-gray-700'>
        <div className='flex items-center gap-2'>
          <span className='done block h-3 w-3 rounded-full'></span>
          {message.dataset.labelIssueDone}
        </div>
        <div className='flex items-center gap-2'>
          <span className='review block h-3 w-3 rounded-full'></span>
          {message.dataset.labelIssueReview}
        </div>
        <div className='flex items-center gap-2'>
          <span className='in-progress block h-3 w-3 rounded-full'></span>
          {message.dataset.labelIssueInProcess}
        </div>
        <div className='flex items-center gap-2'>
          <span className='todo block h-3 w-3 rounded-full'></span>
          {message.dataset.labelIssueTodo}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {student.map((item) => {
          const chartData = {
            labels: [],
            datasets: [
              {
                data: [
                  item.status['DONE'],
                  item.status['REVIEW'],
                  item.status['INPROCESS'],
                  item.status['TODO']
                ],
                backgroundColor: [
                  color.status['DONE'],
                  color.status['REVIEW'],
                  color.status['INPROCESS'],
                  color.status['TODO']
                ]
              }
            ]
          }

          return (
            <div key={item.id} className='flex flex-col items-center'>
              <h3 className='mb-2 text-center font-semibold text-gray-700'>
                {item.name}
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
                            const labels = [
                              message.dataset.labelIssueDone,
                              message.dataset.labelIssueReview,
                              message.dataset.labelIssueInProcess,
                              message.dataset.labelIssueTodo
                            ]
                            const value = tooltipItem.raw
                            const label = labels[tooltipItem.dataIndex]
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

export default TasksByStatusPerProjectBarChart
