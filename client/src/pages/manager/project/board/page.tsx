import Board from '@/components/board/Board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBoardByProjectIdQuery } from '@/feature/board/board.api'
import { convert } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { useParams } from 'react-router-dom'

const BoardPage = () => {
  const { id } = useParams<ProjectParams>()
  const { data, isFetching } = useGetBoardByProjectIdQuery(id as Id, {
    skip: !id
  })

  return (
    <>
      <span></span>
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && data && (
        <ScrollArea>
          <Board {...convert(data)} />
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      )}
    </>
  )
}

export default BoardPage
