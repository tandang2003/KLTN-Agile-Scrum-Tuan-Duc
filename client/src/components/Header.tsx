import React from 'react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'
import GuestOnly from '@/components/wrapper/GuestOnly'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import LogoutButton from '@/components/LogoutButton'

const Header = () => {
  return (
    <header className='bg-white'>
      <div className='container my-4 flex'>
        <Logo nameBrand={true} />
        <GuestOnly>
          <Button className='ml-auto' variant={'ghost'} asChild>
            <NavLink to={'/auth/register'}>Register</NavLink>
          </Button>
          <Button>
            <NavLink to={'/auth/login'}>Login</NavLink>
          </Button>
        </GuestOnly>
        <RequiredAuth>
          <LogoutButton />
        </RequiredAuth>
      </div>
    </header>
  )
}

export default Header
