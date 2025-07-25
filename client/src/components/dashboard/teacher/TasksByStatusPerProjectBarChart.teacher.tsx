import LoadingBoundary from '@/components/LoadingBoundary'
import Paging from '@/components/Paging'
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
import { Bar } from 'react-chartjs-2'

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
                width: `${chartWidth}px`,
                height: '300px'
              }}
            >
              <LoadingBoundary
                data={data}
                isLoading={isFetching}
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
                    setPage({
                      page: page,
                      size: 10
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
        backgroundColor: '#3b82f6'
      },
      {
        label: 'Hoàn thành',
        data: data.map((item) => item.done),
        backgroundColor: '#10b981'
      },
      {
        label: 'Chưa hoàn thành',
        data: data.map((item) => item.notComplete),
        backgroundColor: '#ef4444'
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
      x: {},
      y: {
        title: {
          display: true,
          text: 'Issue'
        },
        beginAtZero: true
      }
    }
  }
  return <Bar options={options} data={dataChart} />
}

export default TasksByStatusPerProjectBarChart
