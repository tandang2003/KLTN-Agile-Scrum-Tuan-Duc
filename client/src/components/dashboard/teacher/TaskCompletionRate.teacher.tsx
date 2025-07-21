import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const TaskCompletionRate = () => {
  const completed = 85
  const total = 100

  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [completed, total - completed],
        backgroundColor: ['#10b981', '#e5e7eb'],
        hoverOffset: 8
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Overall Completion Rate (${((completed / total) * 100).toFixed(0)}%)`
      }
    }
  }

  return <Doughnut options={options} data={data} />
}

export default TaskCompletionRate
