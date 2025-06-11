import { BoardModelType, CardModelType, ColumnsType } from '@/types/card.type'
import { IssueResponse } from '@/types/issue.type'
import { issueStatusList, statusOrder } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

const toBoardModel = (apiResponse: IssueResponse[]): BoardModelType => {
  const apiResponseMapStatus: Record<Id, IssueResponse[]> = {}
  apiResponse.forEach((item) => {
    if (!apiResponseMapStatus[item.status]) {
      apiResponseMapStatus[item.status] = []
    }
    apiResponseMapStatus[item.status].push(item)
  })

  for (const key in apiResponseMapStatus) {
    apiResponseMapStatus[key] = sortLinkedList<IssueResponse>(
      apiResponseMapStatus[key],
      'id',
      'position'
    )
  }

  let columns: ColumnsType = {}
  const cards: CardModelType[] = []
  for (const key in apiResponseMapStatus) {
    columns[key] = {
      name: key,
      cardIds: apiResponseMapStatus[key].map((item) => item.id)
    }

    cards.push(
      ...apiResponseMapStatus[key].map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status
      }))
    )
  }

  columns = sortObjectByKeyOrder(columns, statusOrder)

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

function sortLinkedList<T>(
  items: T[],
  idField: keyof T,
  nextField: keyof T
): T[] {
  const idMap = new Map<any, T>()
  const pointedIds = new Set<any>()

  for (const item of items) {
    const id = item[idField]
    const next = item[nextField]
    idMap.set(id, item)
    if (next) pointedIds.add(next)
  }

  // Find head: the item that is not referenced by any `nextField`
  const head = items.find((item) => !pointedIds.has(item[idField]))
  if (!head) return []

  const result: T[] = []
  let current: T | undefined = head

  while (current) {
    result.push(current)
    const nextId = current[nextField] as unknown as string | number | symbol
    current = nextId ? idMap.get(nextId) : undefined
  }

  return result
}

function sortObjectByKeyOrder<T extends Record<string, any>>(
  obj: T,
  order: (keyof T)[]
): T {
  const sorted: T = {} as T

  for (const key of order) {
    if (key in obj) {
      ;(sorted as any)[key] = obj[key]
    }
  }

  return sorted
}

export { toBoardModel }
