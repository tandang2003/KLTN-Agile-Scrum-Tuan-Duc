import Card from '@/components/board/Card'
import { BaseCardProps, ColumnProps } from '@/components/board/type'
import { useDroppable } from '@dnd-kit/core'

const Column = ({ id, name, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className='w-[250px] h-fit rounded-xl p-2'>
      <h3 className='text-center'>{name}</h3>
      {items?.map((item: BaseCardProps) => <Card {...item} />)}
    </div>
  )
}
export default Column
