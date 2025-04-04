import React from 'react'
import Board from '@/components/board/Board'
import { BoardProps } from '@/components/board/type'
import { BoardModelType } from '@/types/card.type'

const ProjectCardTabs = () => {
  const boardDemo: BoardModelType = {
    process: {
      backlog: {
        id: 'col-1',
        name: 'Backlog',
        items: [
          {
            id: 'card-1',
            name: 'Phân tích data',
            tag: 'LT',
            point: 2,
            numAttach: 3,
            numComment: 2,
            assigners: [
              {
                name: 'Le Anh Duc'
              },
              {
                name: 'Le Anh Duc',
                avatar: 'https://github.com/shadcn.png'
              },
              {
                name: 'Le Anh Duc',
                avatar: 'https://github.com/shadcn.png'
              }
            ]
          },
          { id: 'card-2', name: 'Phân tích nghiệp vụ', tag: 'LT', point: 3 },
          {
            id: 'card-3',
            name: 'Phân tích cấu trúc dự án',
            tag: 'LT',
            point: 3
          },
          {
            id: 'card-4',
            name: 'Tìm hiểu về công nghệ servlet',
            tag: 'LT',
            point: 4
          }
        ]
      },
      todo: {
        id: 'col-2',
        name: 'To do',
        items: [
          {
            id: 'card-5',
            name: 'Tìm hiểu về công nghệ servlet 1',
            tag: 'LT',
            point: 4
          },
          {
            id: 'card-6',
            name: 'Tìm hiểu về công nghệ servlet 2',
            tag: 'LT',
            point: 4
          }
        ]
      },
      doing: { id: 'col-3', name: 'Doing', items: [] },
      review: { id: 'col-4', name: 'Review', items: [] },
      done: { id: 'col-5', name: 'Done', items: [] }
    }
  }

  const convert = (boardModel: BoardModelType): BoardProps => {
    return {
      columns: Object.values(boardModel.process).map((column) => {
        return {
          id: column.id,
          name: column.name,
          itemsOrder: column.items.map((item) => item.id),
          items: column.items.map((item) => {
            return {
              id: item.id,
              columnId: column.id,
              name: item.name
            }
          })
        }
      })
    }
  }

  return <Board {...convert(boardDemo)} />
}

export default ProjectCardTabs
