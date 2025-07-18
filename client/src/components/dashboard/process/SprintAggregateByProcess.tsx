import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { SprintAggregateType } from '@/types/aggregate.type'
type SprintAggregateByProcessProps = {
  data: SprintAggregateType[]
}

const SprintAggregateByProcess = ({ data }: SprintAggregateByProcessProps) => {
  const metrics = [
    { key: 'duration', label: 'Thời gian chạy sprint' },
    { key: 'issuesStarted', label: 'Số lượng issue bắt đầu' },
    { key: 'issuesAdded', label: 'Số lượng issue được thêm' },
    { key: 'issuesRemoved', label: 'Số lượng issue bị loại bỏ' },
    { key: 'issuesTodo', label: 'Số lượng issue ở trạng thái todo' },
    {
      key: 'issuesInProgress',
      label: 'Số lượng issue ở trạng thái in progress'
    },
    { key: 'issueDone', label: 'Số lượng issue hoàn thành' },
    { key: 'members', label: 'Số lượng thành viên' }
  ] as const
  return (
    <div className='overflow-auto rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chỉ số</TableHead>
            {data.map((sprint) => (
              <TableHead key={sprint.id}>{sprint.id}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.key}>
              <TableCell className='font-medium'>{metric.label}</TableCell>
              {data.map((sprint) => (
                <TableCell key={sprint.id}>{sprint[metric.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SprintAggregateByProcess
