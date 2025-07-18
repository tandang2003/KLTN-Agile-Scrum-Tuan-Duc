import messages from '@/constant/message.const'
import { cn } from '@/lib/utils'
import { IssueStatusTrendItem } from '@/types/dashboard.type'
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

type IssueStatusTrendChartProps = {
  data: IssueStatusTrendItem[]
  className?: string
}

const IssueStatusTrendChart = ({
  data: sprints,
  className
}: IssueStatusTrendChartProps) => {
  const message = messages.component.dashboard.chart.issueStatus
  const labels = sprints.map((item) => item.process)

  const issuesTodo = sprints.map((item) => item.issuesTodo)
  const issuesInProgress = sprints.map((item) => item.issuesInProcess)
  const issuesReview = sprints.map((item) => item.issuesReview)

  const data = {
    labels,
    datasets: [
      {
        label: message.dataset.labelIssueTodo,
        data: issuesTodo,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'yellow',
        tension: 0.4
      },
      {
        label: message.dataset.labelIssueInProcess,
        data: issuesInProgress,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'blue',
        tension: 0.4
      },
      {
        label: message.dataset.labelIssueReview,
        data: issuesReview,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'red',
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
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0]
            return `Sprint ID: ${item.label}`
          }
        }
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

export default IssueStatusTrendChart
