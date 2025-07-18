import messages from '@/constant/message.const'
import { SprintAggregateType } from '@/types/aggregate.type'
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

type IssueStatusChartProps = {
  sprints: SprintAggregateType[]
}

const IssueStatusChart = ({ sprints }: IssueStatusChartProps) => {
  const message = messages.component.dashboard.chart.issueStatus
  const labels = sprints.map((item) => item.id)

  const issuesTodo = sprints.map((item) => item.issuesTodo)
  const issuesInProgress = sprints.map((item) => item.issuesInProgress)
  const issuesReview = [1, 3, 4, 2, 5, 1, 3, 2, 1, 1]

  const data = {
    labels,
    datasets: [
      {
        label: message.dataset.labelIssueTodo,
        data: issuesTodo,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: message.dataset.labelIssueInProcess,
        data: issuesInProgress,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      },
      {
        label: message.dataset.labelIssueReview,
        data: issuesReview,
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
      title: {
        display: true,
        text: message.title,
        position: 'top' as const,
        align: 'center' as const,
        font: {
          size: 25
        },
        padding: 20
      },
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

  return <Line data={data} options={options} />
}

export default IssueStatusChart
