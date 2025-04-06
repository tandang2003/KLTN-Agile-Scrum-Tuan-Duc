import React from 'react'
import Board from '@/components/board/Board'
import { board } from '@/assets/card.data'
import { convert } from '@/lib/utils'
import { BoardProps } from '@/components/board/type'

const BoardTab = () => {
  const boardDemo: BoardProps = convert(board)
  return <Board {...boardDemo} />
}

export default BoardTab
