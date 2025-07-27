import AlertHostProvider from '@/components/AlertHost'
import { SprintSelectProvider } from '@/components/issue/IssueSelectSprintContext'
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
        <AlertHostProvider>
          <SprintSelectProvider>{children}</SprintSelectProvider>
        </AlertHostProvider>
      </StateLoader>
    </AppGlobalState>
  )
}

export default Providers
