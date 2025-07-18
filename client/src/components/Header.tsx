import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'
import GuestOnly from '@/components/wrapper/GuestOnly'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import UserDropdown from '@/components/UserDropdown'
import Container from '@/components/Container'
import messages from '@/constant/message.const'

const Header = () => {
  const { login, register } = messages.component.header
  return (
    <header className='bg-white'>
      <Container className='my-4 flex'>
        <Logo nameBrand={true} />
        <GuestOnly mode='hide'>
          <Button className='ml-auto' variant={'ghost'} asChild>
            <NavLink to={'/auth/register'}>{register}</NavLink>
          </Button>
          <Button>
            <NavLink to={'/auth/login'}>{login}</NavLink>
          </Button>
        </GuestOnly>

        <RequiredAuth mode='hide'>
          <UserDropdown className='ml-auto bg-inherit text-black hover:bg-gray-300' />
        </RequiredAuth>
      </Container>
    </header>
  )
}

export default Header
