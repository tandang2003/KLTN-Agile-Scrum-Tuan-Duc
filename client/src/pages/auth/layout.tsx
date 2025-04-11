import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='relative flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Logo className='absolute top-5 left-5' goToHome />
      <div className='w-full max-w-sm'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
