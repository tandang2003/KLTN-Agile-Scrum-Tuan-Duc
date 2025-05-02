import { setNavigator } from '@/configuration/component.config'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setNavigator(navigate)
  }, [navigate])
  return (
    <>
      <Outlet />
    </>
  )
}

export default RootLayout
