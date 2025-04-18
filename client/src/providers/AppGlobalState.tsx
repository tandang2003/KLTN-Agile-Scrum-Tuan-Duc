import { store } from '@/context/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const AppGlobalState = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}

export default AppGlobalState
