import Empty from '@/components/Empty'
import AttachmentView from '@/components/issue/AttachmenView'
import ListView from '@/components/ListView'
import TitleLevel from '@/components/TitleLevel'
import messages from '@/constant/message.const'
type ViewAttachmentProps = {
  data: {
    id: string
    filename: string
    url: string
    extension: string
  }[]
}

const ViewAttachmentIssue = ({ data }: ViewAttachmentProps) => {
  const message = messages.component.issue
  return (
    <>
      <TitleLevel level={'lv-2'}>{message.resource}</TitleLevel>
      <ListView
        data={data}
        className='mt-2'
        emptyComponent={<Empty className='mt-2'>Không có tài nguyên</Empty>}
        render={(item) => {
          return (
            <div
              key={item.id}
              className='flex items-start gap-4 rounded-md border-2 bg-white p-2 shadow-md'
            >
              <AttachmentView
                extension={item.extension}
                filename={item.filename}
                url={item.url}
              />
              <span>{item.filename}</span>
            </div>
          )
        }}
      />
    </>
  )
}

export default ViewAttachmentIssue
