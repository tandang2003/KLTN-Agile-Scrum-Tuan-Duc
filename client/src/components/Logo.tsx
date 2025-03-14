import React from 'react'

const Logo = ({ nameBrand = false }: { nameBrand: boolean }) => {
  return (
    <div className='inline-flex gap-2 items-center'>
      <span className='size-8'>
        <img src='/logo.png' alt='' className='w-full h-full' />
      </span>
      {nameBrand && <h1 className='text-2xl text-black'>TaskFlow</h1>}
    </div>
  )
}

export default Logo
