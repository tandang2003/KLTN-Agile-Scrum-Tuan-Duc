import AlertHostProvider from '@/components/AlertHost'
import { SprintSelectProvider } from '@/components/issue/IssueSelectSprintContext'
import Loading from '@/components/Loading'
import AppGlobalState from '@/providers/AppGlobalState'
import { DateProvider } from '@/providers/DateProvider'
import StateLoader from '@/providers/StateLoader'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppGlobalState>
      <DateProvider>
        <StateLoader loading={<Loading />}>
          <Toaster richColors position='bottom-right' />
          <AlertHostProvider>
            <SprintSelectProvider>{children}</SprintSelectProvider>
          </AlertHostProvider>
        </StateLoader>
      </DateProvider>
    </AppGlobalState>
  )
}

export default Providers
