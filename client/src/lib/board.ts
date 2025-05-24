import { BoardModelType, CardModelType, ColumnsType } from '@/types/card.type'
import { IssueResponse1 } from '@/types/issue.type'
import { issueStatusList, statusOrder } from '@/types/model/typeOf'

const toBoardModel = (apiResponse: IssueResponse1[]): BoardModelType => {
  const columns: ColumnsType = {}
  const cards: CardModelType[] = []
  apiResponse.forEach((item, index) => {
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
      point: 0
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
