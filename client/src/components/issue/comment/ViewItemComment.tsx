import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDateToString } from '@/lib/date.helper'
import { Id } from '@/types/other.type'

type ItemCommentProps = {
  id: Id
  message: string
  name: string
  createdAt: Date
  avatar?: string
}

const ViewItemComment = ({
  id: _id,
  name = 'Anonymous',
  message,
  createdAt,
  avatar = 'https://github.com/shadcn.png'
}: ItemCommentProps) => {
  return (
    <div className='grid grid-cols-[50px_1fr] gap-2'>
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
      <div className='relative rounded-md border px-2 py-3 text-base shadow-md'>
        <p>{message}</p>

        <span className='text-thin absolute right-1 bottom-1 text-xs text-gray-400'>
          {formatDateToString(createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ViewItemComment
