import { board } from '@/assets/card.data'
import { BoardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'

const boardApi = {
  getData: (projectId: Id): Promise<BoardModelType> => {
    console.info('Board Api', `getData ${projectId}`)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(board)
      }, 3000)
    })
  }
}

export default boardApi
