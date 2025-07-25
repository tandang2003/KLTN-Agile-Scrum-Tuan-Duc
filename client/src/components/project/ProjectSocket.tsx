import NotificationItem from '@/components/notification/NotificationItem'
import ProjectMessage from '@/components/project/ProjectMessage'
import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import projectService from '@/services/project.service'
import { Id } from '@/types/other.type'
import { ReactNode, useEffect } from 'react'
import { toast } from 'sonner'
type ProjectSocketProps = {
  projectId: Id
}

const ProjectSocket = ({ projectId }: ProjectSocketProps) => {
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
      toast(<ProjectMessage data={value.bodyParse} />)
    })
    return () => {
      wsInstant.unsubscribe()
    }
  }, [ws, isReady, projectId])

  return null
}

export default ProjectSocket
