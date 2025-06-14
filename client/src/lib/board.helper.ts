import { Position } from '@/components/board/type'
import { BoardModelType, ColumnsType } from '@/types/card.type'
import { IssueResponse } from '@/types/issue.type'
import { issueStatusList } from '@/types/model/typeOf'

const DEFAULT_POSITION: Position = {
  BACKLOG: [],
  TODO: [],
  INPROCESS: [],
  REVIEW: [],
  DONE: []
}

const toBoardModel = (
  issues: IssueResponse[],
  position: Position
): BoardModelType => {
  let columns: ColumnsType = {}
  issueStatusList.forEach((status) => {
    columns[status] = {
      name: status,
      cardIds: position[status] || []
    }
  })
  const result: BoardModelType = {
    columns: columns,
    cards: issues
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

export { toBoardModel, DEFAULT_POSITION }
