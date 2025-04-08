import Board from '@/components/board/Board'
import { board } from '@/assets/card.data'
import { convert } from '@/lib/utils'
import { BoardProps } from '@/components/board/type'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const BoardPage = () => {
  const boardDemo: BoardProps = convert(board)
  return (
    <ScrollArea className='bg-[F9F8FF] whitespace-nowrap'>
      <Board {...boardDemo} />
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export default BoardPage
