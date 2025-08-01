import BadgeSprint from '@/components/badge/BadgeSprint'
import SprintColumnsAction from '@/components/datatable/sprint/sprintColumnsAction'
import Icon from '@/components/Icon'
import ToolTip from '@/components/Tooltip'
import messages from '@/constant/message.const'
import { useAppSelector } from '@/context/redux/hook'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { formatDate } from '@/lib/utils'
import { SprintWorkspaceDataTable } from '@/types/sprint.type'
import { ColumnDef } from '@tanstack/react-table'

type SprintColumns = SprintWorkspaceDataTable

const { end, point, predict, start, status, title } =
  messages.component.dataTable.sprint.columns

const columns: ColumnDef<SprintColumns>[] = [
  {
    accessorKey: 'title',
    header: title,
    size: 100,
    cell: ({ row }) => {
      const id: string = row.original.id
      const title: string = row.getValue('title')

      return <ToolTip trigger={<span>{title}</span>}>{id}</ToolTip>
    }
  },
  {
    accessorKey: 'storyPoint',
    header: point,
    size: 50,
    cell: ({ row }) => {
      const value: number = row.getValue('storyPoint')
      return <div>{value}</div>
    }
  },
  {
    accessorKey: '',
    header: status,
    cell: ({ row }) => {
      const id: string = row.original.id
      const start: Date = row.original.start
      const end: Date = row.original.end
      const {
        util: { getStatusSprint }
      } = useSprintCurrent()
      const status = getStatusSprint({
        id,
        start,
        end
      })
      return <BadgeSprint status={status} />
    }
  },

  {
    accessorKey: 'start',
    header: start,
    cell: ({ row }) => {
      const value: Date = row.getValue('start')
      return formatDate(value)
    }
  },
  {
    accessorKey: 'predict',
    header: predict,
    cell: ({ row }) => {
      const value: Date = row.getValue('predict')
      const current: Date = new Date()
      return (
        <div>
          {formatDate(value)}
          {current > value && <Icon className='ml-3' icon={'mynaui:check'} />}
        </div>
      )
    }
  },
  {
    accessorKey: 'end',
    header: end,
    cell: ({ row }) => {
      const value: Date = row.getValue('end')
      return formatDate(value)
    }
  },
  {
    accessorKey: 'action',
    header: '',
    size: 10,
    cell: ({ row }) => {
      const sprintId: string = row.original.id
      const start: Date = row.original.start
      const end: Date = row.original.end
      const id = useAppSelector((state) => state.sprintSlice.current?.id)

      return (
        <SprintColumnsAction
          sprint={{
            id: sprintId,
            start,
            end
          }}
          onlyView={id === sprintId ? false : true}
        />
      )
    }
  }
]

export { columns }
export type { SprintColumns }
