import { UniqueIdentifier } from '@dnd-kit/core'
import React from 'react'

type WorkspaceCard = {
  id: UniqueIdentifier
  name: string
  owner: string
}

const WorkspaceCard = ({ id, name, owner }: WorkspaceCard) => {
  return (
    <article
      data-id={id}
      className='border-accent h-[100px] rounded-xl border-1 p-2'
    >
      <h2 className='text-2xl font-bold uppercase'>{name}</h2>

      <span className='text-md'>{owner}</span>
    </article>
  )
}

export default WorkspaceCard
