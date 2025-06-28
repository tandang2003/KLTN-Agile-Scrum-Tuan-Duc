import { useAppDispatch } from '@/context/redux/hook'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const SprintRefresh = () => {
  const [sprintRefresh, setSprintRefresh] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(() => {}, [])

  if (!sprintRefresh) return null
  return <Outlet />
}

export default SprintRefresh
