import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const TasksCompletedOverTime = () => {
  const labels = [
    'Jul 1',
    'Jul 3',
    'Jul 5',
    'Jul 7',
    'Jul 9',
    'Jul 11',
    'Jul 13'
  ]
  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: [3, 5, 4, 6, 2, 8, 5],
        borderColor: '#10b981',
        backgroundColor: '#10b98144',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Tasks Completed Over Time'
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }

  return <Line options={options} data={data} />
}

export default TasksCompletedOverTime
