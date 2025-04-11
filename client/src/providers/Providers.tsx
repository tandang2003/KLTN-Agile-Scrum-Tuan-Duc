import AppGlobalState from '@/providers/AppGlobalState'
import RestoreToken from '@/providers/RestoreToken'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppGlobalState>
      <RestoreToken>
        <Toaster richColors position='bottom-right' />
        {children}
      </RestoreToken>
    </AppGlobalState>
  )
}

export default Providers
