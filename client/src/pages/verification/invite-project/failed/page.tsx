import { Button } from '@/components/ui/button'
import { HOME_PATH } from '@/constant/app.const'
import { NavLink } from 'react-router-dom'

const VerificationFailedPage = () => {
  return (
    <div className='grid h-screen place-items-center bg-linear-to-r from-gray-500 to-red-500'>
      <div className='flex flex-col items-center'>
        <h1 className='animate-fade-down animate-once animation-duration-1000 animate-ease-linear h1 rounded-md bg-red-400 px-4 py-2 text-white shadow-md'>
          Join project failed
        </h1>
        <NavLink to={HOME_PATH}>
          <Button className={'mt-3'}>Home</Button>
        </NavLink>
      </div>
    </div>
  )
}

export default VerificationFailedPage
