import ProjectMessage from '@/components/project/ProjectMessage'
import ToolTip from '@/components/Tooltip'
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
import { useEffect, useRef, useState } from 'react'
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
  const [connect, setConnect] = useState<boolean>(false)
  useStompClient({
    accessToken: auth.accessToken,
    onConnect: (client) => {
      console.log('✅ WebSocket project room connected')
      // Clean up previous subscription
      unsubscribeRef.current?.()
      setConnect(true)
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
            if (value.bodyParse.message.status) {
              toast.success('Chạy dự đoán tự động', {
                description: message.toast.success
              })
            } else {
              toast.error('Chạy dự đoán tự động', {
                description: message.toast.failed
              })
            }
          }
        }
      )
      unsubscribeRef.current = () => {
        subscription.unsubscribe()
        setConnect(false)
      }
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected project room')
      setConnect(false)
    },
    onError: (error) => {
      console.error('WebSocket error', error)
      setConnect(false)
    }
  })

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.()
      setConnect(false)
    }
  }, [])
  return (
    <ToolTip
      trigger={
        connect ? (
          <span className='relative flex size-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
            <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
          </span>
        ) : (
          <span className='inline-flex size-3 rounded-full bg-gray-400'></span>
        )
      }
    >
      <span className='text-xs text-white'>
        {connect ? 'Đã kết nối' : 'Chưa kết nối'}
      </span>
    </ToolTip>
  )
}

export default ProjectSocket
