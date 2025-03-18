import React from 'react'
import { Card as CardUI, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = {
  id: string
  name: string
  columnId: string
}

const Card = ({ id, name, columnId }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      name,
      columnId
    }
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    background: 'white',
    marginBottom: '8px',
    borderRadius: '4px',
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardUI className='round-xl'>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
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
