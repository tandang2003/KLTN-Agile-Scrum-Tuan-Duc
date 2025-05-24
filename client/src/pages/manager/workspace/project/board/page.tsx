import Board from '@/components/board/Board'
import LoadingBoundary from '@/components/LoadingBoundary'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import { toBoardModel } from '@/lib/board'
import { BoardModelType } from '@/types/card.type'
import { IssueResponse1 } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { cloneDeep } from 'lodash'
import { useEffect, useRef, useState } from 'react'

const BoardPage = () => {
  const { projectId } = useAppId()
  const { data, isFetching } = useGetListIssueQuery(
    { projectId: projectId as Id },
    {
      skip: !projectId
    }
  )
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  // const [height, setHeight] = useState<number>(0)

  // useEffect(() => {
  //   if (scrollAreaRef.current) {
  //     const bound = scrollAreaRef.current.getBoundingClientRect()
  //     setHeight(window.innerHeight - bound.y)
  //   }
  // }, [])

  return (
    <LoadingBoundary<IssueResponse1[]>
      data={data}
      fallback={<div>No result</div>}
      isLoading={isFetching}
      loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
    >
      {(data) => {
        const boardData = toBoardModel(cloneDeep(data))
        return (
          <div ref={scrollAreaRef} className='flex-1'>
            {data && (
              <ScrollArea className='h-full'>
                <Board
                  data={boardData}
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
      }}
    </LoadingBoundary>
  )
}

export default BoardPage
