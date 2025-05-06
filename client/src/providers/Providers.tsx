import AppGlobalState from '@/providers/AppGlobalState'
import RestoreToken from '@/providers/RestoreToken'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppGlobalState>
      <Toaster richColors position='bottom-right' />
      {children}
    </AppGlobalState>
  )
}

export default Providers
