import { board } from '@/assets/card.data'
import Board from '@/components/board/Board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBoardByProjectIdQuery } from '@/feature/board/board.api'
import { cn } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { cloneDeep } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const BoardPage = () => {
  const { projectId } = useParams<ProjectParams>()
  const { data, isFetching } = useGetBoardByProjectIdQuery(projectId as Id, {
    skip: !projectId
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const bound = scrollAreaRef.current.getBoundingClientRect()
      console.log(window.innerHeight - bound.y)
      setHeight(window.innerHeight - bound.y)
    }
  }, [])

  return (
    <div
      ref={scrollAreaRef}
      style={{
        height: `${height}px`
      }}
    >
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && data && (
        <ScrollArea className='h-full'>
          <Board
            data={cloneDeep(data)}
            onMove={({ active, columnTo, indexTo }) => {
              console.log('active', active)
              console.log('columnTo', columnTo)
              console.log('indexTo', indexTo)
            }}
          />
          <ScrollBar orientation='vertical' />
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      )}
    </div>
  )
}

export default BoardPage
