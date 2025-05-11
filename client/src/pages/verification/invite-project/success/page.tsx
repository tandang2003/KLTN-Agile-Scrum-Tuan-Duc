import { Button } from '@/components/ui/button'
import { HOME_PATH } from '@/lib/const'
import { NavLink } from 'react-router-dom'

const VerificationSuccessPage = () => {
  return (
    <div className='grid h-screen place-items-center bg-linear-to-r from-cyan-500 to-blue-500'>
      <div className='flex flex-col items-center'>
        <h1 className='animate-fade-down animate-once animation-duration-1000 animate-ease-linear h1 rounded-md bg-red-400 px-4 py-2 text-white shadow-md'>
          Join project success
        </h1>
        <NavLink to={HOME_PATH}>
          <Button className={'mt-3'}>Home</Button>
        </NavLink>
      </div>
    </div>
  )
}

export default VerificationSuccessPage
