import { Id } from '@/types/other.type'
import { createContext } from 'react'

type BoardContextValue = {
  sprintId: Id
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined)

export default BoardContext
