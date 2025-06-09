import { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import HtmlViewer from '@/components/HtmlViewer'
import { formatDateToString } from '@/lib/date'

type ItemCommentProps = {
  message: string
  name: string
  createdAt: Date
  avatar?: string
}

const ItemComment = ({
  name = 'Anonymous',
  message,
  createdAt,
  avatar = 'https://github.com/shadcn.png'
}: ItemCommentProps) => {
  return (
    <div>
      <Avatar className='mt-2'>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className=''>
          <span className='text-base font-semibold'>{name}</span>
          <span className='text-thin text-sm'>
            {formatDateToString(createdAt)}
          </span>
        </div>
        <HtmlViewer className='px-2 py-3 text-base' value={message} />
      </div>
    </div>
  )
}

export default ItemComment
