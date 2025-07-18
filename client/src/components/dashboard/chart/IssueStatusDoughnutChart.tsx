import messages from '@/constant/message.const'
import { cn } from '@/lib/utils'
import { IssueStatus } from '@/types/model/typeOf'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

type IssueStatusDoughnutChartProps = {
  data: Record<IssueStatus, number> // Example: { TODO: 5, IN_PROGRESS: 3, REVIEW: 2 }
  className?: string
  width?: string
  height?: string
}

const IssueStatusDoughnutChart = ({
  data: statusData,
  className,
  width,
  height
}: IssueStatusDoughnutChartProps) => {
  const message = messages.component.dashboard.chart.statusDoughnutChart

  const labels = [
    message.dataset.labelIssueTodo,
    message.dataset.labelIssueInProcess,
    message.dataset.labelIssueReview,
    message.dataset.labelIssueDone
  ]

  const data = {
    labels,
    datasets: [
      {
        label: message.title,
        data: [
          statusData.TODO ?? 0,
          statusData.INPROCESS ?? 0,
          statusData.REVIEW ?? 0,
          statusData.DONE ?? 0
        ],
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', 'green'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2
      }
    ]
  }

  const options: ChartOptions<'doughnut'> = {
    radius: '90%',
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw
            const label = tooltipItem.label
            return `${label}: ${value}`
          }
        }
      }
    }
  }

  return (
    <div>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
        {message.title}
      </h2>
      <Doughnut
        width={width}
        height={height}
        className={cn(className)}
        data={data}
        options={options}
      />
    </div>
  )
}

export default IssueStatusDoughnutChart
