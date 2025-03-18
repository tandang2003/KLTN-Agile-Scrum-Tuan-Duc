export type CardModelType = {
  id: string
  name: string
  tag: 'LT' | 'TH'
  point: number
}
export type ColumnModelType = {
  id: string
  name: string
  items: CardModelType[]
}

export type BoardModelType = {
  process: {
    backlog: ColumnModelType
    todo: ColumnModelType
    doing: ColumnModelType
    review: ColumnModelType
    done: ColumnModelType
  }
}
