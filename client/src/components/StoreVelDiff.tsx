import { useAlertHost } from '@/components/AlertHost'
import { Button } from '@/components/ui/button'
import aggregateService from '@/services/aggregate.service'
import { Id } from '@/types/other.type'
import { ReactNode } from 'react'
import { toast } from 'sonner'
type StoreVelDiffProps = {
  workspaceId: Id
}

const StoreVelDiff = ({ workspaceId }: StoreVelDiffProps) => {
  const { showAlert } = useAlertHost()
  const handleOnClick = () => {
    showAlert({
      title: 'Store vel diff',
      message: workspaceId,
      onConfirm: () => {
        return aggregateService
          .storeVelDiff(workspaceId)
          .then(() => {
            toast.success('Create data vel diff')
          })
          .catch(() => {
            toast.error('Create data vel diff')
          })
      }
    })
  }
  return (
    <Button type='button' className='active-bg' onClick={handleOnClick}>
      Store vel diff
    </Button>
  )
}

export default StoreVelDiff
