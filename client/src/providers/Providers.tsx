import AppGlobalState from '@/providers/AppGlobalState'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return <AppGlobalState>{children}</AppGlobalState>
}

export default Providers
