import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-white'>
      <div className='container flex my-4'>
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
