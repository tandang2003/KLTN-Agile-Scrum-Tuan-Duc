import { BoardModelType } from '@/types/card.type'

const THUMBNAIL_CARD =
  'https://plus.unsplash.com/premium_photo-1664304568964-ae7f81f395b8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const board: BoardModelType = {
  process: {
    backlog: {
      id: 'col-1',
      name: 'Backlog',
      items: [
        {
          id: 'card-1',
          name: 'Phân tích data',
          category: 'LT',
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
          ],
          thumbnail: THUMBNAIL_CARD,
          numAssigner: 9,
          tags: [
            {
              name: 'UX/UI',
              color: 'lightGrayDarkText'
            },
            {
              name: 'Document',
              color: 'greenDarkBlueGrayText'
            }
          ]
        },
        { id: 'card-2', name: 'Phân tích nghiệp vụ', category: 'LT', point: 3 },
        {
          id: 'card-3',
          name: 'Phân tích cấu trúc dự án',
          category: 'LT',
          point: 3
        },
        {
          id: 'card-4',
          name: 'Tìm hiểu về công nghệ servlet',
          category: 'LT',
          point: 4
        },
        {
          id: 'card-5',
          name: 'Tìm hiểu về công nghệ servlet',
          category: 'LT',
          point: 4
        },
        {
          id: 'card-6',
          name: 'Tìm hiểu về công nghệ servlet',
          category: 'LT',
          point: 4
        }
      ]
    },
    todo: {
      id: 'col-2',
      name: 'To do',
      items: [
        {
          id: 'card-7',
          name: 'Tìm hiểu về công nghệ servlet 1',
          category: 'LT',
          point: 4
        },
        {
          id: 'card-8',
          name: 'Tìm hiểu về công nghệ servlet 2',
          category: 'LT',
          point: 4
        }
      ]
    },
    doing: { id: 'col-3', name: 'Doing', items: [] },
    review: { id: 'col-4', name: 'Review', items: [] },
    done: { id: 'col-5', name: 'Done', items: [] }
  }
}
