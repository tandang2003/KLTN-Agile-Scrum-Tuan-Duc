import { BaseCardProps } from '@/components/board/type'
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card as CardUI
} from '@/components/ui/card'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = BaseCardProps

const Card = ({ id, name, columnId }: CardProps) => {
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
    padding: '10px',
    background: 'white',
    borderRadius: '4px',
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid red' : undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardUI className='round-xl'>
        <CardHeader>
          <CardTitle className='truncate leading-[1.67]'>{name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        {/* <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </CardUI>
    </div>
  )
}

export default Card
