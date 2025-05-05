import {
  CardHeader,
  Card,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { UniqueIdentifier } from '@dnd-kit/core'
import { NavLink } from 'react-router-dom'

type WorkspaceCard = {
  id: UniqueIdentifier
  name: string
  owner: string
}

const WorkspaceCard = ({ id, name, owner }: WorkspaceCard) => {
  return (
    <Card className='rounded-xl border-2 border-gray-300 p-0 hover:shadow-xl'>
      <CardHeader className='relative flex rounded-t-xl bg-red-400 py-4'>
        <NavLink
          to={`/manager/workspace/${id}`}
          className={'flex-1 hover:cursor-pointer hover:underline'}
        >
          <h3 className='h3 line-clamp-1 uppercase'>{name}</h3>
          <span className='text-md mt-2'>{owner}</span>
        </NavLink>
        <span className='basis-[100px]'></span>
        <span className='absolute top-1/4 right-4 grid size-[100px] place-items-center rounded-full bg-gray-700 text-3xl text-white'>
          {owner?.charAt(0)}
        </span>
      </CardHeader>
      <CardDescription></CardDescription>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default WorkspaceCard
