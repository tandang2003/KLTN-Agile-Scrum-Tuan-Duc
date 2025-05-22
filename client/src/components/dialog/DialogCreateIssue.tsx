import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import Editor from '@/components/Editor'
import CreateIssueForm from '@/components/form/CreateIssueForm'
import InlineEdit from '@/components/InlineEdit'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type DialogCreateIssueProps = {} & DialogControllerProps

const DialogCreateIssue = ({ open, onOpen }: DialogCreateIssueProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[95vw]'>
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className='h-[65vh] py-4'>
          <CreateIssueForm onSubmit={() => onOpen(false)} />
        </ScrollArea>

        {/* <InlineEdit<string>
              className='flex-1 opacity-65'
              value={'Please enter task name'}
              onSave={(val) => {
                console.log(val)
              }}
              displayComponent={(value) => <h1>{value}</h1>}
              renderEditor={({ value, onChange, onBlur, ref, onKeyDown }) => (
                <Input
                  ref={ref}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  onKeyDown={onKeyDown}
                />
              )}
            /> */}
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateIssue
