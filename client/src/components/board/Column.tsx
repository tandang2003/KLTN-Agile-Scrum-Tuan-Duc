import Card from '@/components/board/Card'
import { BaseCardProps, ColumnProps } from '@/components/board/type'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'

const Column = ({
  id,
  name,
  items,
  container = ''
}: ColumnProps & {
  container?: string
}) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={(cn('h-fit rounded-xl p-2'), container)}>
      <h3 className='pb-2 text-center leading-[1.67]'>{name}</h3>
      <div className='flex flex-col gap-3'>
        {items?.map((item: BaseCardProps) => <Card {...item} />)}
      </div>
    </div>
  )
}
export default Column
