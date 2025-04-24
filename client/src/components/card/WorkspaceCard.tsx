import { UniqueIdentifier } from '@dnd-kit/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

type WorkspaceCard = {
  id: UniqueIdentifier
  name: string
  owner: string
}

const WorkspaceCard = ({ id, name, owner }: WorkspaceCard) => {
  return (
    <article
      data-id={id}
      className='h-[100px] rounded-xl border-2 border-gray-300 p-2'
    >
      <NavLink to={`/manager/workspace/${id}`}>
        <h3 className='h3 uppercase'>{name}</h3>
      </NavLink>

      <span className='text-md mt-2'>{owner}</span>
    </article>
  )
}

export default WorkspaceCard
