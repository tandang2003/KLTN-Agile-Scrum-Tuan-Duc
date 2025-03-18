import Card from '@/components/Card'
import { CardModelType } from '@/types/card.type'
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

type ColumnProps = {
  id: string
  title: string
  items?: CardModelType[]
}

const Column = ({ id, title, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} style={{ width: '250px', padding: '10px', background: '#ddd', borderRadius: '8px' }}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      {items?.map((item) => <Card key={item.id} id={item.id} name={item.name} columnId={id} />)}
    </div>
  )
}

export default Column
