import { HOME_PATH } from '@/lib/const'
import { cn } from '@/lib/utils'
import React from 'react'
import { NavLink } from 'react-router-dom'

type LogoProps = {
  nameBrand?: boolean
  goToHome?: boolean
} & React.ComponentProps<'div'> &
  Omit<React.ComponentProps<typeof NavLink>, 'to'>

const Logo = ({
  nameBrand = false,
  goToHome = false,
  className,
  ...props
}: LogoProps) => {
  const content = (
    <>
      <span className='size-8'>
        <img src='/logo.png' alt='' className='h-full w-full' />
      </span>
      {nameBrand && <h1 className='text-2xl text-black'>TaskFlow</h1>}
    </>
  )

  return goToHome ? (
    <NavLink
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
      to={HOME_PATH}
    >
      {content}
    </NavLink>
  ) : (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      {content}
    </div>
  )
}

export default Logo
