import { ActionDragEnd, Position } from '@/components/board/type'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as Kanban from '@/components/ui/kanban'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppDispatch } from '@/context/redux/hook'
import { setCurrentIssue } from '@/feature/issue/issue.slice'
import { enableUpdateIssue } from '@/feature/trigger/trigger.slice'
import { toBoardModel_V2 } from '@/lib/board.helper'
import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { IssueResponse } from '@/types/issue.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type RenderBoardProps = {
  data: {
    columns: Position
    items: IssueResponse[]
  }
  handleOnMove: ActionDragEnd
  disabled?: boolean
}
const COLUMN_TITLES: Record<
  IssueStatus,
  {
    name: string
    bg: string
    backdrop: string
  }
> = {
  TODO: {
    name: 'Todo',
    bg: 'todo ',
    backdrop: 'blur-todo'
  },
  INPROCESS: {
    name: 'In progress',
    bg: 'in-progress',
    backdrop: 'blur-in-progress'
  },
  REVIEW: {
    name: 'Review',
    bg: 'review',
    backdrop: 'blur-review'
  },
  DONE: {
    name: 'Done',
    bg: 'done',
    backdrop: 'blur-done'
  }
}
const RenderBoard = ({ data, handleOnMove, disabled }: RenderBoardProps) => {
  const [columns, setColumns] = useState<Record<IssueStatus, CardModelType[]>>(
    toBoardModel_V2(data.items, data.columns)
  )
  const columnsRef = useRef<Record<IssueStatus, CardModelType[]> | null>(null)

  useEffect(() => {
    setColumns(toBoardModel_V2(data.items, data.columns))
  }, [data.items, data.columns])

  const handleOnDragStart = () => {
    columnsRef.current = columns
  }

  const handleColumn = (columns: Record<IssueStatus, CardModelType[]>) => {
    setColumns(columns)
  }

  const handleColumnRollback = () => {
    if (columnsRef.current) {
      setColumns(columnsRef.current)
    }
  }

  return (
    <div className='flex-1'>
      <ScrollArea className='h-full'>
        <Kanban.Root
          autoScroll
          value={columns}
          onValueChange={handleColumn}
          onDragStart={handleOnDragStart}
          onMove={(
            event: DragEndEvent & {
              activeIndex: number
              overIndex: number
              fromColumn?: UniqueIdentifier
              toColumn?: UniqueIdentifier
            }
          ) => {
            handleOnMove?.({
              active: event.active.id as Id,
              columnTo: (event.toColumn as Id) ?? null,
              indexTo: event.overIndex
            })
              .then(() => {
                console.log('then')
              })
              .catch((_) => {
                handleColumnRollback()
              })
          }}
          getItemValue={(item) => item.id}
        >
          <Kanban.Board className='grid auto-rows-fr sm:grid-cols-4'>
            {Object.entries(columns).map(([columnValue, tasks]) => (
              <Kanban.Column
                key={columnValue}
                value={columnValue}
                className={COLUMN_TITLES[columnValue as IssueStatus].backdrop}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex w-full items-center justify-between gap-2'>
                    <span className='text-md font-semibold'>
                      {COLUMN_TITLES[columnValue as IssueStatus].name}
                    </span>
                    <Badge
                      variant='secondary'
                      className={cn(
                        'pointer-events-none rounded-sm text-white',
                        COLUMN_TITLES[columnValue as IssueStatus].bg
                      )}
                    >
                      {tasks.length}
                    </Badge>
                  </div>
                </div>
                <div className='flex flex-col gap-2 p-0.5'>
                  {tasks.map((task) => (
                    <KanbanItem
                      key={task.id}
                      task={{
                        id: task.id,
                        name: task.name,
                        status: task.status
                      }}
                      disabled={disabled}
                    />
                  ))}
                </div>
              </Kanban.Column>
            ))}
          </Kanban.Board>
          <Kanban.Overlay>
            <div className='bg-primary/10 size-full rounded-md' />
          </Kanban.Overlay>
        </Kanban.Root>
        <ScrollBar orientation='vertical' />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}

type KanbanItemProps = {
  task: CardModelType
  disabled?: boolean
}

const KanbanItem = ({ task, disabled = false }: KanbanItemProps) => {
  const dispatch = useAppDispatch()
  const handleOnClick = () => {
    dispatch(setCurrentIssue(task.id))
    dispatch(enableUpdateIssue())
  }
  return (
    <Kanban.Item key={task.id} value={task.id} asChild>
      <div className='bg-card flex items-center rounded-md border p-3 shadow-xs'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <ToolTip
              trigger={
                <span
                  className='hover-opacity line-clamp-1 text-sm font-medium hover:underline'
                  onClick={handleOnClick}
                >
                  {task.name}
                </span>
              }
            >
              {task.id}
            </ToolTip>
          </div>
        </div>
        <div className='ml-auto'>
          {!disabled && (
            <Kanban.ItemHandle asChild>
              <Button variant='ghost' size='icon'>
                <GripVertical className='h-4 w-4' />
              </Button>
            </Kanban.ItemHandle>
          )}
        </div>
      </div>
    </Kanban.Item>
  )
}

export default RenderBoard
