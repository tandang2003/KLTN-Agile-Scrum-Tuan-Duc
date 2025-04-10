import { store } from '@/context/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

const AppGlobalState = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster richColors />
      {children}
    </Provider>
  )
}

export default AppGlobalState
