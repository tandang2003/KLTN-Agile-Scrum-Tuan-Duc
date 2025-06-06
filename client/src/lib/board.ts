import { BoardModelType, CardModelType, ColumnsType } from '@/types/card.type'
import { IssueResponse } from '@/types/issue.type'
import { issueStatusList } from '@/types/model/typeOf'

const toBoardModel = (apiResponse: IssueResponse[]): BoardModelType => {
  const columns: ColumnsType = {}
  const cards: CardModelType[] = []
  apiResponse.forEach((item) => {
    if (!columns[item.status]) {
      columns[item.status] = {
        name: item.status,
        cardIds: [item.id]
      }
    } else {
      columns[item.status].cardIds.push(item.id)
    }

    cards.push({
      id: item.id,
      name: item.name,
      point: 0,
      status: item.status
    })
  })
  issueStatusList.forEach((item) => {
    if (!columns[item]) {
      columns[item] = {
        name: item,
        cardIds: []
      }
    }
  })
  const result: BoardModelType = {
    columns,
    cards
  }

  return result
}

export { toBoardModel }
