import Board from '@/components/Board'
import { BoardModelType } from '@/types/card.type'
import React from 'react'

const ProjectCards = () => {
  const boardDemo: BoardModelType = {
    process: {
      backlog: {
        id: 'col-1',
        name: 'Backlog',
        items: [
          { id: 'card-1', name: 'Phân tích data', tag: 'LT', point: 2 },
          { id: 'card-2', name: 'Phân tích nghiệp vụ', tag: 'LT', point: 3 },
          { id: 'card-3', name: 'Phân tích cấu trúc dự án', tag: 'LT', point: 3 },
          { id: 'card-4', name: 'Tìm hiểu về công nghệ servlet', tag: 'LT', point: 4 }
        ]
      },
      todo: {
        id: 'col-2',
        name: 'To do',
        items: [
          { id: 'card-5', name: 'Tìm hiểu về công nghệ servlet', tag: 'LT', point: 4 },
          { id: 'card-6', name: 'Tìm hiểu về công nghệ servlet', tag: 'LT', point: 4 }
        ]
      },
      doing: { id: 'col-3', name: 'Doing', items: [] },
      review: { id: 'col-4', name: 'Review', items: [] },
      done: { id: 'col-5', name: 'Done', items: [] }
    }
  }

  return (
    <div>
      <Board model={boardDemo} />
    </div>
  )
}

export default ProjectCards
