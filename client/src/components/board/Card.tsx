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
import { cn, uuid } from '@/lib/utils'
import { getTagColor } from '@/types/tag.type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = BaseCardProps

const Card = ({
  id,
  name,
  columnId,
  numAttach,
  numComment,
  numAssigner = 0,
  assigners,
  thumbnail,
  tags
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
      columnId,
      numAttach,
      numComment,
      numAssigner,
      assigners,
      thumbnail,
      tags
    }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
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
      className='transition-outline outline-0 drop-shadow-xs hover:outline-2 hover:outline-offset-0 hover:outline-green-300 hover:outline-solid'
    >
      <CardUI className='rounded-none border-none bg-white p-0 shadow-none'>
        <CardHeader className='p-0'>
          <span className='flex'>
            {tags?.map(({ color, name }) => {
              return (
                <Badge
                  key={uuid()}
                  variant='default'
                  className={cn('mr-3')}
                  style={{
                    background: getTagColor(color).background,
                    color: getTagColor(color).text
                  }}
                >
                  {name}
                </Badge>
              )
            })}
          </span>
          <CardTitle className='line-clamp-2 overflow-hidden leading-[1.67] text-wrap text-ellipsis'>
            {name}
          </CardTitle>
        </CardHeader>
        {/* {thumbnail && (
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
        )} */}
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
              {/* <span className='text-nowrap'>Assigned to</span> */}
              <span className={cn('flex', numAssigner != 0 && 'ml-3')}>
                {numAssigner != 0 &&
                  assigners?.map((item) => {
                    return (
                      <Avatar
                        key={uuid()}
                        className={cn('size-6 border-2', '-ml-2')}
                      >
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )
                  })}
                {/* Create more fallback*/}
                {numAssigner != 0 && numAssigner > assigners.length && (
                  <Avatar className={cn('size-6 border-2', '-ml-2')}>
                    <AvatarFallback>
                      {`${numAssigner - assigners.length}`}
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
