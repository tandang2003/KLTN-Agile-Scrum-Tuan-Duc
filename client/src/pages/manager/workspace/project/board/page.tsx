import { board } from '@/assets/card.data'
import Board from '@/components/board/Board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBoardByProjectIdQuery } from '@/feature/board/board.api'
import { convert } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { useParams } from 'react-router-dom'

const BoardPage = () => {
  // const { projectId } = useParams<ProjectParams>()
  // const { data, isFetching } = useGetBoardByProjectIdQuery(projectId as Id, {
  //   skip: !projectId
  // })
  return (
    <>
      {/* {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />} */}
      {/* {!isFetching && data && ( */}
      <ScrollArea>
        <Board
          onMove={({ active, columnTo, indexTo }) => {
            console.log('active', active)
            console.log('columnTo', columnTo)
            console.log('indexTo', indexTo)
          }}
        />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {/* )} */}
    </>
  )
}

export default BoardPage
