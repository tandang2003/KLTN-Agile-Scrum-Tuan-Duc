import { board } from '@/assets/card.data'
import { issueData } from '@/assets/issue.data'
import { BoardModelType, ColumnModelType } from '@/types/card.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { object } from 'zod'

const boardService = {
  getData: (projectId: Id): Promise<BoardModelType> => {
    return new Promise((resolve) => {
      const columns: Record<Id, ColumnModelType> = issueData.reduce(
        (acc, data) => {
          if (!acc[data.status].name) {
            acc[data.status] = {
              name: data.status,
              cardIds: []
            }
          }
          acc[data.status].cardIds.push(data.id)
          return acc
        },
        {
          BACKLOG: {},
          TODO: {},
          INPROCESS: {},
          REVIEW: {},
          DONE: {}
        } as Record<IssueStatus, ColumnModelType>
      )
      const data: BoardModelType = {
        columns: columns,
        cards: issueData.map((item) => ({
          id: item.id,
          name: item.title,
          point: item.storyPoint
        }))
      }
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }
}

export default boardService
