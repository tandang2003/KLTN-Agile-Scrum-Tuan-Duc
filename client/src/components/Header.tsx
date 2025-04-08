import React from 'react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='bg-white'>
      <div className='container my-4 flex'>
        <Logo nameBrand={true} />
        <Button className='ml-auto' variant={'ghost'}>
          Sign Up
        </Button>
        <Button>Sign In</Button>
      </div>
    </header>
  )
}

export default Header
