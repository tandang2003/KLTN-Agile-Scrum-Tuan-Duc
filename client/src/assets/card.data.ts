import { BoardModelType } from '@/types/card.type'

export const board: BoardModelType = {
  columns: {
    BACKLOG: {
      name: 'Backlog',
      cardIds: ['card-2', 'card-1']
    },
    TODO: {
      name: 'To do',
      cardIds: ['card-7', 'card-8']
    },
    INPROCESS: { name: 'Doing', cardIds: [] },
    REVIEW: { name: 'Review', cardIds: [] },
    DONE: { name: 'Done', cardIds: [] }
  },
  cards: [
    { id: 'card-2', name: 'Phân tích nghiệp vụ', point: 3 },
    {
      id: 'card-1',
      name: 'Phân tích data',
      point: 2,
      numAttach: 3,
      numComment: 2,
      numAssigner: 9
    },

    {
      id: 'card-3',
      name: 'Phân tích cấu trúc dự án',
      point: 3
    },
    {
      id: 'card-4',
      name: 'Tìm hiểu về công nghệ servlet',
      point: 4
    },
    {
      id: 'card-5',
      name: 'Tìm hiểu về công nghệ servlet',
      point: 4
    },
    {
      id: 'card-6',
      name: 'Tìm hiểu về công nghệ servlet',
      point: 4
    },

    {
      id: 'card-7',
      name: 'Tìm hiểu về công nghệ servlet 1',
      point: 4
    },
    {
      id: 'card-8',
      name: 'Tìm hiểu về công nghệ servlet 2',
      point: 4
    },
    {
      id: 'card-10',
      name: 'Tìm hiểu về công nghệ servlet',
      point: 4
    },
    {
      id: 'card-11',
      name: 'Tìm hiểu về công nghệ servlet',
      point: 4
    }
  ]
}
