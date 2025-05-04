'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as Kanban from '@/components/ui/kanban'
import { GripVertical } from 'lucide-react'
import * as React from 'react'

interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  assignee?: string
  dueDate?: string
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  done: 'Done'
}

export function KanbanDemo() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [
      {
        id: '1',
        title: 'Add authentication',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-04-01'
      },
      {
        id: '2',
        title: 'Create API endpoints',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-04-05'
      },
      {
        id: '3',
        title: 'Write documentation',
        priority: 'low',
        assignee: 'Bob Johnson',
        dueDate: '2024-04-10'
      }
    ],
    inProgress: [
      {
        id: '4',
        title: 'Design system updates',
        priority: 'high',
        assignee: 'Alice Brown',
        dueDate: '2024-03-28'
      },
      {
        id: '5',
        title: 'Implement dark mode',
        priority: 'medium',
        assignee: 'Charlie Wilson',
        dueDate: '2024-04-02'
      }
    ],
    done: [
      // {
      //   id: '7',
      //   title: 'Setup project',
      //   priority: 'high',
      //   assignee: 'Eve Davis',
      //   dueDate: '2024-03-25'
      // },
      // {
      //   id: '8',
      //   title: 'Initial commit',
      //   priority: 'low',
      //   assignee: 'Frank White',
      //   dueDate: '2024-03-24'
      // }
    ]
  })

  React.useEffect(() => {
    console.log(columns)
  }, [columns])

  return (
    <Kanban.Root
      value={columns}
      onValueChange={(columns) => {
        setColumns(columns)
      }}
      getItemValue={(item) => item.id}
      onDragEnd={(event) => {
        console.log(event)
      }}
    >
      <Kanban.Board className='grid auto-rows-fr sm:grid-cols-3'>
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <Kanban.Column key={columnValue} value={columnValue}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>
                  {COLUMN_TITLES[columnValue]}
                </span>
                <Badge
                  variant='secondary'
                  className='pointer-events-none rounded-sm'
                >
                  {tasks.length}
                </Badge>
              </div>
              <Kanban.ColumnHandle asChild>
                <Button variant='ghost' size='icon'>
                  <GripVertical className='h-4 w-4' />
                </Button>
              </Kanban.ColumnHandle>
            </div>
            <div className='flex flex-col gap-2 p-0.5'>
              {tasks.map((task) => (
                <Kanban.Item key={task.id} value={task.id} asHandle asChild>
                  <div className='bg-card rounded-md border p-3 shadow-xs'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center justify-between gap-2'>
                        <span className='line-clamp-1 text-sm font-medium'>
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            task.priority === 'high'
                              ? 'destructive'
                              : task.priority === 'medium'
                                ? 'default'
                                : 'secondary'
                          }
                          className='pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize'
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className='text-muted-foreground flex items-center justify-between text-xs'>
                        {task.assignee && (
                          <div className='flex items-center gap-1'>
                            <div className='bg-primary/20 size-2 rounded-full' />
                            <span className='line-clamp-1'>
                              {task.assignee}
                            </span>
                          </div>
                        )}
                        {task.dueDate && (
                          <time className='text-[10px] tabular-nums'>
                            {task.dueDate}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </Kanban.Item>
              ))}
            </div>
          </Kanban.Column>
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        <div className='bg-primary/10 size-full rounded-md' />
      </Kanban.Overlay>
    </Kanban.Root>
  )
}
