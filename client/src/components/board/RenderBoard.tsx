import Board from '@/components/board/Board'
import { Position } from '@/components/board/type'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppSelector } from '@/context/redux/hook'
import { toBoardModel } from '@/lib/board.helper'
import { IssueResponse } from '@/types/issue.type'
import { cloneDeep } from 'lodash'
import { ComponentProps, memo } from 'react'

type OnMove = ComponentProps<typeof Board>['onMove']

type RenderBoardProps = {
  data: {
    columns: Position
    items: IssueResponse[]
  }
  handleOnMove: OnMove
  disabled?: boolean
}

const RenderBoard = ({ data, handleOnMove, disabled }: RenderBoardProps) => {
  const dataToRender = cloneDeep(toBoardModel(data.items, data.columns))
  const role = useAppSelector((state) => state.authSlice.user?.role)
  if (!role) return null
  return (
    <div className='flex-1'>
      <ScrollArea className='h-full'>
        <Board data={dataToRender} onMove={handleOnMove} disabled={disabled} />
        <ScrollBar orientation='vertical' />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}

export default memo(RenderBoard)
