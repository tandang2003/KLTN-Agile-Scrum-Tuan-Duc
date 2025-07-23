import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { cn } from '@/lib/utils'
import messages from '@/constant/message.const'
import { WorkloadDataItem } from '@/types/dashboard.type'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type MultiWorkloadBarChartProps = {
  data: WorkloadDataItem[]
  className?: string
}

const MultiWorkloadBarChart = ({
  data,
  className
}: MultiWorkloadBarChartProps) => {
  const message = messages.component.dashboard.chart.workloadBarChart

  const labels = data.map((item) => item.assignee.name ?? item.assignee)

  const chartData = {
    labels,
    datasets: [
      {
        label: message.dataset.labelIssueTotal,
        data: data.map((item) => item.total),
        backgroundColor: '#4BC0C0'
      },
      {
        label: message.dataset.labelIssueDone,
        data: data.map((item) => item.done),
        backgroundColor: '#36A2EB'
      },
      {
        label: message.dataset.labelIssueFailed,
        data: data.map((item) => item.notComplete),
        backgroundColor: '#FF6384'
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y', // Horizontal layout
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: message.scales.x
        }
      },
      y: {
        title: {
          display: true,
          text: message.scales.y
        }
      }
    }
  }

  return (
    <div>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
        {message.title}
      </h2>
      <Bar className={cn(className)} data={chartData} options={options} />
    </div>
  )
}

export default MultiWorkloadBarChart
