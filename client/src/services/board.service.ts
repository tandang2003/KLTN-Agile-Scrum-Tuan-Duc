import { board } from '@/assets/card.data'
import { BoardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'

const boardService = {
  getData: (projectId: Id): Promise<BoardModelType> => {
    console.log(projectId)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(board)
      }, 1000)
    })
  }
}

export default boardService
