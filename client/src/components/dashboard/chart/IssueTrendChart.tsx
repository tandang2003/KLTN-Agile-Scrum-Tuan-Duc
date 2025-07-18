import messages from '@/constant/message.const'
import { cn } from '@/lib/utils'
import { IssueTrendItem } from '@/types/dashboard.type'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
)

type IssueTrendChartProps = {
  data: IssueTrendItem[]
  className?: string
}

const IssueTrendChart = ({
  data: sprints,
  className
}: IssueTrendChartProps) => {
  const message = messages.component.dashboard.chart.issueTrend
  const labels = sprints.map((item) => item.process)

  const addedIssues = sprints.map((item) => item.issuesAdded)
  const removedIssues = sprints.map((item) => item.issuesRemoved)

  const data = {
    labels,
    datasets: [
      {
        label: message.dataset.labelIssueAdded,
        data: addedIssues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: message.dataset.labelIssueRemoved,
        data: removedIssues,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    layout: {
      padding: 20
    },
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      x: {
        title: {
          text: message.labelX,
          display: true,
          font: {
            size: 16
          }
        }
      },
      y: {
        title: {
          display: true,
          text: message.labelY,
          font: {
            size: 16
          }
        },
        beginAtZero: true
      }
    }
  }

  return <Line className={cn(className)} data={data} options={options} />
}

export default IssueTrendChart
