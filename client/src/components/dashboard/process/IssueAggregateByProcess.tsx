import { IssueAggregateType } from '@/types/aggregate.type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { uuid } from '@/lib/utils'
type IssueAggregateByProcessProps = {
  data: IssueAggregateType
}

const IssueAggregateByProcess = ({ data }: IssueAggregateByProcessProps) => {
  const metrics = [
    { key: 'numOfAffectVersions', label: 'Số version bị ảnh hưởng' },
    { key: 'numOfFixVersions', label: 'Số version fix' },
    { key: 'numOfLink', label: 'Số liên kết' },
    { key: 'numOfBlocked', label: 'Số lần bị chặn' },
    { key: 'numOfBlock', label: 'Số lần chặn issue khác' },
    { key: 'numOfComment', label: 'Số comment' },
    { key: 'numOfChangeFixVersion', label: 'Số lần thay đổi fix version' },
    { key: 'numOfChangeOfPriority', label: 'Số lần thay đổi độ ưu tiên' },
    { key: 'numOfChangeOfDescription', label: 'Số lần thay đổi mô tả' },
    { key: 'complexityOfDescription', label: 'Độ phức tạp mô tả' },
    { key: 'complatibleOfAssignee', label: 'Mức độ phù hợp của assignee' }
  ] as const

  return (
    <div className='overflow-auto rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chỉ số</TableHead>
            {data.aggregate.map((issue) => (
              <TableHead key={uuid()}>{uuid()}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.key}>
              <TableCell className='font-medium'>{metric.label}</TableCell>
              {data.aggregate.map((issue) => (
                <TableCell key={uuid()}>{issue[metric.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default IssueAggregateByProcess
