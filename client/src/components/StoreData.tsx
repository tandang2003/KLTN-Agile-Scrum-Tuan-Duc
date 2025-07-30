import { useAlertHost } from '@/components/AlertHost'
import { Button } from '@/components/ui/button'
import aggregateService from '@/services/aggregate.service'
import { Id } from '@/types/other.type'
import { toast } from 'sonner'
type StoreDataProps = {
  workspaceId: Id
}

const StoreData = ({ workspaceId }: StoreDataProps) => {
  const { showAlert } = useAlertHost()
  const handleOnClick = () => {
    showAlert({
      title: 'Store data',
      message: workspaceId,
      onConfirm: () => {
        return aggregateService
          .storeData(workspaceId)
          .then(() => {
            toast.success('Create data')
          })
          .catch(() => {
            toast.error('Create data')
          })
      }
    })
  }
  return (
    <Button type='button' className='active-bg' onClick={handleOnClick}>
      Store data
    </Button>
  )
}

export default StoreData
