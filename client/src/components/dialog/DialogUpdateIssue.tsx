import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import Editor from '@/components/Editor'
import InlineEdit from '@/components/InlineEdit'
import LoadingBoundary from '@/components/LoadingBoundary'
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetIssueQuery } from '@/feature/issue/issue.api'
import { IssueDetailResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
type DialogUpdateIssueProps = {} & DialogControllerProps

const DialogUpdateIssue = ({ open, onOpen }: DialogUpdateIssueProps) => {
  const id = useAppSelector((state: RootState) => state.issueSlice.current?.id)
  const { data, isFetching } = useGetIssueQuery(id as Id, {
    skip: !id
  })
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <LoadingBoundary<IssueDetailResponse>
          data={data}
          isLoading={isFetching}
          fallback={<div>Not result</div>}
        >
          {(data) => (
            <div className='flex gap-3'>
              <div className='flex-1 [&>*:not(:first-element)]:mt-3'>
                <InlineEdit<string>
                  value={data.name}
                  onSave={(val) => {
                    console.log(val)
                  }}
                  displayComponent={(value) => (
                    <h1 className='text-2xl'>{value}</h1>
                  )}
                  renderEditor={({
                    value,
                    onChange,
                    onBlur,
                    ref,
                    onKeyDown
                  }) => (
                    <Input
                      ref={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      onBlur={onBlur}
                      onKeyDown={onKeyDown}
                    />
                  )}
                />
                <div>
                  <Label className='text-xl font-bold'>Description</Label>
                  <InlineEdit<string>
                    value={data.description}
                    onSave={(val) => {
                      console.log(val)
                    }}
                    className='mt-2 block'
                    displayComponent={(value) => {
                      return (
                        <p className='opacity-65'>
                          {value ?? 'Add a description...'}
                        </p>
                      )
                    }}
                    renderEditor={({ value, onChange, onBlur, ref }) => (
                      <Editor
                        markdown={value}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => console.log(e)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='basis-[250px] [&>*:not(:first-child)]:mt-3'></div>
            </div>
          )}
        </LoadingBoundary>
      </DialogContent>
    </DialogController>
  )
}

export default DialogUpdateIssue
