import Board from '@/components/board/Board'
import { convert } from '@/lib/utils'
import { BoardProps } from '@/components/board/type'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import boardApi from '@/services/board.service'
import { useParams } from 'react-router-dom'
import { ProjectParams } from '@/types/route.type'

const BoardPage = () => {
  const { id } = useParams<ProjectParams>()
  const [board, setBoard] = useState<BoardProps | null>(null)
  useEffect(() => {
    if (id)
      boardApi.getData(id).then((response) => {
        setBoard(convert(response))
      })
  }, [])

  return (
    <ScrollArea className='bg-[F9F8FF] whitespace-nowrap'>
      {board && <Board {...board} />}
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export default BoardPage
