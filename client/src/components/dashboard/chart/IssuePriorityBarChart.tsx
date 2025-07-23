import messages, { getPriorityDisplayName } from '@/constant/message.const'
import { IssuePriority } from '@/types/model/typeOf'
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type IssuePriorityBarChartProps = {
  data: Record<IssuePriority, number>
  className?: string
}

const IssuePriorityBarChart = ({
  data,
  className
}: IssuePriorityBarChartProps) => {
  const message = messages.component.dashboard.chart.issuePriority

  const labels = Object.keys(data) as IssuePriority[]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Issue Count',
        data: labels.map((level) => data[level]),
        backgroundColor: [
          '#F87171',
          '#FBBF24',
          '#60A5FA',
          '#A78BFA',
          '#F472B6'
        ],
        borderRadius: 6
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const priority = tooltipItems[0].label as IssuePriority
            return getPriorityDisplayName(priority)
          },
          label: (item) => `Số lượng: ${item.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: message.scales.y
        }
      },
      x: {
        title: {
          display: true,
          text: message.scales.x
        },
        ticks: {
          callback: function (value) {
            const label = labels[value as number] as IssuePriority
            return getPriorityDisplayName(label)
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
      <div className='h-[400px] w-full'>
        <Bar className={className} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default IssuePriorityBarChart
