import Card from '@/components/board/Card'
import { BaseCardProps, ColumnProps } from '@/components/board/type'
import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
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
      <span className='mb-3.5 flex items-center border-b-1 border-gray-300 pb-3.5'>
        <Icon
          className='text-purple-700'
          icon={'icon-park-outline:dot'}
          size={20}
        />
        <span className='title px-1.5'>{name}</span>
        <span className='text-sm font-bold text-gray-500'>3</span>
        <Button variant={'ghost'} className='ml-auto p-0'>
          <Icon size={25} icon={'material-symbols:add-rounded'} />
        </Button>
      </span>
      <div className='flex flex-col gap-3'>
        {items?.map((item: BaseCardProps) => <Card {...item} />)}
      </div>
    </div>
  )
}
export default Column
