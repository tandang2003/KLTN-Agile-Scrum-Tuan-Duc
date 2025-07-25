type KanbanHeaderProps = {
  name: string
  length: number
}

const KanbanHeader = ({ name, length }: KanbanHeaderProps) => {
  return (
    <div className='sticky top-0 z-10 flex items-center border-b-2 bg-white px-2 py-3.5'>
      <span className='title h3 px-1.5'>{name}</span>
      <span className='ml-auto text-sm font-bold text-gray-500'>{length}</span>
    </div>
  )
}

export default KanbanHeader
