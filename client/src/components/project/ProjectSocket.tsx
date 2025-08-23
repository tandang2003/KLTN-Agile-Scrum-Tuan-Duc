import ProjectMessage from '@/components/project/ProjectMessage'
import messages from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { enableNotification } from '@/feature/trigger/trigger.slice'
import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import projectService, {
  isPredictResponse,
  isUpdateResponse
} from '@/services/project.service'
import { Id } from '@/types/other.type'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
type ProjectSocketProps = {
  projectId: Id
}

const ProjectSocket = ({ projectId }: ProjectSocketProps) => {
  const isNotify = useAppSelector((state) => state.triggerSlice.isNotify)
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const message = messages.component.sprintPredict

  useStompClient({
    accessToken: auth.accessToken,
    onConnect: (client) => {
      console.log('✅ WebSocket project room connected')
      // Clean up previous subscription
      unsubscribeRef.current?.()

      const subscription = projectService.receiveUpdate(
        client,
        projectId,
        (value) => {
          if (isUpdateResponse(value.bodyParse)) {
            if (!isNotify) {
              dispatch(enableNotification())
              const { message } = value.bodyParse
              if (message.createdBy) {
                // render board again
              }
              toast(<ProjectMessage data={message} />)
            }
          }
          if (isPredictResponse(value.bodyParse)) {
            toast('Chạy dự đoán tự động', {
              description: value.bodyParse.message.status
                ? message.toast.success
                : message.toast.failed
            })
          }
        }
      )
      unsubscribeRef.current = () => subscription.unsubscribe()
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected project room')
    },
    onError: (error) => {
      console.error('WebSocket error', error)
    }
  })

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.()
    }
  }, [])
  return null
}

export default ProjectSocket
