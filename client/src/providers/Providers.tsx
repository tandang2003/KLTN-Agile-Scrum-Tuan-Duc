import Loading from '@/components/Loading'
import AppGlobalState from '@/providers/AppGlobalState'
import StateLoader from '@/providers/StateLoader'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppGlobalState>
      <StateLoader loading={<Loading />}>
        <Toaster richColors position='bottom-right' />
        {children}
      </StateLoader>
    </AppGlobalState>
  )
}

export default Providers
