import messages from '@/constant/message.const'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TasksByStatusPerProjectBarChartProps = {
  data: {
    id: string
    name: string
    status: {
      todo: number
      inProcess: number
      review: number
      done: number
    }
  }[]
}

const TasksByStatusPerProjectBarChart = ({
  data: issues
}: TasksByStatusPerProjectBarChartProps) => {
  const message =
    messages.component.dashboard.teacher.tasksByStatusPerProjectBarChart

  // Example project names
  const labels = issues.map((issue) => issue.name)

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Not Started',
        data: issues.map((issue) => issue.status.todo),
        backgroundColor: '#94a3b8' // Gray
      },
      {
        label: 'In Progress',
        data: issues.map((issue) => issue.status.inProcess),
        backgroundColor: '#3b82f6' // Blue
      },
      {
        label: 'Completed',
        data: issues.map((issue) => issue.status.done),
        backgroundColor: '#10b981' // Green
      },
      {
        label: 'Overdue',
        data: issues.map((issue) => issue.status.review),
        backgroundColor: '#ef4444' // Red
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
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  }

  return (
    <>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
        {message.title}
      </h2>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <Bar options={options} data={data} />
      </div>
    </>
  )
}

export default TasksByStatusPerProjectBarChart
