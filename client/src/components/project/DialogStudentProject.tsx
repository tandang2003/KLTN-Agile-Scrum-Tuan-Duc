import { DialogControllerProps } from '@/components/dialog/DialogController'
import HtmlViewer from '@/components/HtmlViewer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import messages from '@/constant/message.const'
import { useGetMembersQuery } from '@/feature/project/project.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
import { ProjectDetailResponse } from '@/types/project.type'
type DialogStudentProjectProps = {
  data: ProjectDetailResponse
} & DialogControllerProps

const DialogStudentProject = ({
  data,
  open,
  onOpen
}: DialogStudentProjectProps) => {
  const message = messages.component.project.dialog.members
  const { projectId } = useAppId()
  const { data: members } = useGetMembersQuery(projectId as Id, {
    skip: !projectId
  })
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>{message.description}</DialogDescription>
        </DialogHeader>
        <HtmlViewer value={data.description} fallback='' />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{message.table.email}</TableHead>
              <TableHead>{message.table.uniId}</TableHead>
              <TableHead>{message.table.name}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.email}</TableCell>
                <TableCell>{item.uniId}</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default DialogStudentProject
