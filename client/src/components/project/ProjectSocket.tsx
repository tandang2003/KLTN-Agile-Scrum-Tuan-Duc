import ProjectMessage from '@/components/project/ProjectMessage'
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
              toast(<ProjectMessage data={value.bodyParse.message} />)
            }
          }
          if (isPredictResponse(value.bodyParse)) {
            toast(value.bodyParse.message.message)
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
