import Board from '@/components/board/Board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const BoardPage = () => {
  // const { projectId } = useParams<ProjectParams>()
  // const { data, isFetching } = useGetBoardByProjectIdQuery(projectId as Id, {
  //   skip: !projectId
  // })
  return (
    <>
      {/* {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />} */}
      {/* {!isFetching && data && ( */}
      <ScrollArea className=''>
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
