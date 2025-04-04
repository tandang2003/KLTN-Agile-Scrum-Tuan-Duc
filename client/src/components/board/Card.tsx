import { BaseCardProps } from '@/components/board/type'
import Icon from '@/components/Icon'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as CardUI
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

//plus.unsplash.com/premium_photo-1664304568964-ae7f81f395b8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

//https:
type CardProps = BaseCardProps

const Card = ({
  id,
  name,
  columnId,
  numAttach,
  numComment,
  numAssigner = 0,
  assigners,
  thumbnail
}: CardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      id,
      name,
      columnId
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    background: 'white',
    borderRadius: '16px',
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid red' : undefined
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='drop-shadow-xs'
    >
      <CardUI className='gap-2.5 rounded-none border-none bg-white p-0 shadow-none'>
        <CardHeader className='p-0'>
          <span className='flex'>
            <Badge variant='default'>Badge</Badge>
            <Badge variant='default' className='ml-3'>
              Badge
            </Badge>
          </span>
          <CardTitle className='line-clamp-2 overflow-hidden leading-[1.67] text-wrap text-ellipsis'>
            {name}
          </CardTitle>
        </CardHeader>
        {thumbnail && (
          <CardContent className='p-0'>
            <AspectRatio ratio={16 / 9}>
              <img
                loading='lazy'
                src={thumbnail}
                alt='Image'
                className='h-full w-full rounded-md'
              />
            </AspectRatio>
          </CardContent>
        )}
        <CardFooter className='p-0'>
          <span className='flex items-center gap-1'>
            <Icon icon={'material-symbols:chat-outline'} size={20} />
            <span>{numComment ?? 0}</span>
          </span>
          <span className='ml-2.5 flex items-center gap-1'>
            <Icon icon={'akar-icons:attach'} size={20} />
            <div>{numAttach ?? 0}</div>
          </span>
          {assigners && (
            <span className='ml-auto flex items-center text-sm'>
              Assigned to
              <span className='ml-1 flex'>
                {assigners?.map((item, index) => {
                  return (
                    <Avatar
                      className={cn('size-6 border-2', !index && '-ml-2')}
                    >
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )
                })}
                {numAssigner && numAssigner > assigners.length && (
                  <Avatar className={cn('size-6 border-2', '-ml-2')}>
                    <AvatarFallback>
                      {`+ ${numAssigner - assigners.length}`}
                    </AvatarFallback>
                  </Avatar>
                )}
              </span>
            </span>
          )}
        </CardFooter>
      </CardUI>
    </div>
  )
}

export default Card
