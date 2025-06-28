import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import HtmlViewer from '@/components/HtmlViewer'
import { formatDateToString } from '@/lib/date.helper'
import ToolTip from '@/components/Tooltip'

type ItemCommentProps = {
  message: string
  name: string
  createdAt: Date
  avatar?: string
  key: string
}

const ItemComment = ({
  key,
  name = 'Anonymous',
  message,
  createdAt,
  avatar = 'https://github.com/shadcn.png'
}: ItemCommentProps) => {
  return (
    <div key={key} className='grid grid-cols-[50px_1fr] gap-2'>
      <div>
        <Avatar className='mt-2'>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col gap-1 self-center'>
        <span className='text-base font-semibold'>{name}</span>
      </div>
      <div> </div>
      <ToolTip
        trigger={
          <HtmlViewer
            className='rounded-md border px-2 py-3 text-base shadow-md'
            value={message}
          />
        }
      >
        <span className='text-thin text-xs'>
          {formatDateToString(createdAt)}
        </span>
      </ToolTip>
    </div>
  )
}

export default ItemComment
