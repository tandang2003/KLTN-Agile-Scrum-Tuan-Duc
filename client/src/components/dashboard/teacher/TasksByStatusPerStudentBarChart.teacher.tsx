import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { WorkloadDataItemDetail } from '@/types/dashboard.type'
import messages from '@/constant/message.const'
import { useEffect, useRef, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TasksByStatusPerStudentBarChartProps = {
  data: WorkloadDataItemDetail[]
}

const TasksByStatusPerStudentBarChart = ({
  data: student
}: TasksByStatusPerStudentBarChartProps) => {
  const message =
    messages.component.dashboard.teacher.tasksByStatusPerStudentBarChart

  const labels = student.map((item) => item.assignee.name)
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

  const chartWidth = Math.max(containerWidth, labels.length * BAR_WIDTH)

  const data = {
    labels,
    datasets: [
      {
        label: message.dataset.labelIssueInProcess,
        data: student.map((item) => item.inProcess),
        backgroundColor: '#3b82f6'
      },
      {
        label: message.dataset.labelIssueDone,
        data: student.map((item) => item.done),
        backgroundColor: '#10b981'
      },
      {
        label: message.dataset.labelIssueReview,
        data: student.map((item) => item.review),
        backgroundColor: '#ef4444'
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
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
  }

  return (
    <>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
        {message.title}
      </h2>
      <div ref={containerRef} style={{ width: '100%' }}>
        <div
          style={{ overflowX: chartWidth > containerWidth ? 'auto' : 'hidden' }}
        >
          <div
            style={{
              minWidth: '100%',
              width: `${chartWidth}px`,
              height: '400px'
            }}
          >
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TasksByStatusPerStudentBarChart
