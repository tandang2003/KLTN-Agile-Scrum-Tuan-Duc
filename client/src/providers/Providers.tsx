import AlertHost from '@/components/AleartHost'
import Loading from '@/components/Loading'
import AppGlobalState from '@/providers/AppGlobalState'
import StateLoader from '@/providers/StateLoader'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppGlobalState>
      <StateLoader loading={<Loading />}>
        <Toaster expand={true} richColors position='bottom-right' />
        <AlertHost />

        {children}
      </StateLoader>
    </AppGlobalState>
  )
}

export default Providers
