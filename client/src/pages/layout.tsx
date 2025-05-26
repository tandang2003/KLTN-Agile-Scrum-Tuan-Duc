import { setNavigator } from '@/configuration/component.config'
import RestoreToken from '@/providers/RestoreToken'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setNavigator(navigate)
  }, [navigate])
  return (
    <RestoreToken>
      <Outlet />
    </RestoreToken>
  )
}

export default RootLayout
