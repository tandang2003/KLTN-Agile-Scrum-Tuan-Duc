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
import { useEffect } from 'react'
import { toast } from 'sonner'
type ProjectSocketProps = {
  projectId: Id
}

const ProjectSocket = ({ projectId }: ProjectSocketProps) => {
  const isNotify = useAppSelector((state) => state.triggerSlice.isNotify)
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const { ws, isReady } = useStompClient({
    accessToken: auth.accessToken,
    onConnect: (client) => {
      console.log('✅ WebSocket project room connected')
      // You can subscribe here if needed
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected project room')
    },
    onError: (error) => {
      console.error('WebSocket error', error)
    }
  })
  useEffect(() => {
    if (!ws || !isReady || !ws.connected) return
    const wsInstant = projectService.receiveUpdate(ws, projectId, (value) => {
      if (isUpdateResponse(value.bodyParse)) {
        if (!isNotify) {
          dispatch(enableNotification())
          toast(<ProjectMessage data={value.bodyParse.message} />)
        }
      }
      if (isPredictResponse(value.bodyParse)) {
        toast(value.bodyParse.message.message)
      }
    })
    return () => {
      wsInstant.unsubscribe()
    }
  }, [ws, isReady, projectId])

  return null
}

export default ProjectSocket
