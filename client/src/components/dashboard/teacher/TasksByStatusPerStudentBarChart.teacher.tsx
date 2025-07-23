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
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TasksByStatusPerStudentBarChartProps = {}

const TasksByStatusPerStudentBarChart =
  ({}: TasksByStatusPerStudentBarChartProps) => {
    const message =
      messages.component.dashboard.teacher.tasksByStatusPerStudentBarChart
    const [page, setPage] = useState<PageRequest>({
      page: 0,
      size: 5
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

  const labels = useMemo(
    () => student.map((item) => item.assignee.name),
    [student]
  )

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: message.dataset.labelIssueInProcess,
          data: student.map((item) => item.total),
          backgroundColor: '#3b82f6'
        },
        {
          label: message.dataset.labelIssueDone,
          data: student.map((item) => item.done),
          backgroundColor: '#10b981'
        },
        {
          label: message.dataset.labelIssueReview,
          data: student.map((item) => item.notComplete),
          backgroundColor: '#ef4444'
        }
      ]
    }),
    [labels, student]
  )

  const options = useMemo<ChartOptions<'bar'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: message.title
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            maxRotation: 45,
            minRotation: 30
          }
        },
        y: { stacked: true, beginAtZero: true }
      }
    }),
    [message.title]
  )

  return <Bar options={options} data={chartData} />
}

export default TasksByStatusPerStudentBarChart
