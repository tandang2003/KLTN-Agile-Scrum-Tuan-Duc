import { Toaster } from '@/components/ui/sonner'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default RootLayout
