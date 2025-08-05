import { useAlertHost } from '@/components/AlertHost'
import { Button } from '@/components/ui/button'
import aggregateService from '@/services/aggregate.service'
import { Id } from '@/types/other.type'
import { toast } from 'sonner'
type StoreDataProps = {
  workspaceId: Id
  stage: number
}

const StoreData = ({ workspaceId, stage }: StoreDataProps) => {
  const { showAlert } = useAlertHost()
  const handleOnClick = () => {
    showAlert({
      title: 'Store data',
      message: workspaceId,
      onConfirm: () => {
        return aggregateService
          .storeData(workspaceId, stage)
          .then(() => {
            toast.success(`Create data stage ${stage} success`)
          })
          .catch(() => {
            toast.error('Create data failed')
          })
      }
    })
  }
  return (
    <Button type='button' className='active-bg' onClick={handleOnClick}>
      Store data {stage}
    </Button>
  )
}

export default StoreData
