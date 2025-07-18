import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import envConfig from '@/configuration/env.config.ts'
import { Client, CompatClient, Stomp } from '@stomp/stompjs'
import { useAppSelector } from '@/context/redux/hook.ts'
import { CommentResType } from '@/types/comment.type.ts'

type CommentContextType = {
  isReady: boolean
  ws?: Client
  comment?: CommentResType[]
  setComment?: (value: CommentResType[]) => void
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export const useCommentContext = () => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error(
      'useContextComment must be used inside ProviderCommentProvider'
    )
  }
  return context
}

type CommentProviderProps = {
  children?: ReactNode
  initValue?: CommentResType[]
}

export const CommentProvider = ({
  children,
  initValue = []
}: CommentProviderProps) => {
  const accessToken = useAppSelector((state) => state.authSlice.accessToken)
  const [isReady, setIsReady] = useState<boolean>(false)
  const ws = useRef<CompatClient>(null)
  const [comment, setComment] = useState<CommentResType[]>(initValue)
  useEffect(() => {
    if (initValue) {
      setComment(initValue)
    }
  }, [initValue])
  useEffect(() => {
    const connectWebSocket = () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }

      const stompClient = Stomp.over(
        () => new SockJS(`${envConfig.BACKEND_URL}/ws`)
      )
      stompClient.connectHeaders = headers
      stompClient.reconnectDelay = 5000
      stompClient.debug = () => {}

      stompClient.onConnect = () => {
        ws.current = stompClient
        setIsReady(true)
      }

      stompClient.onStompError = () => {
        console.error('WebSocket error')
      }

      stompClient.onDisconnect = () => {
        setIsReady(false)
      }

      stompClient.activate()
    }

    connectWebSocket()

    // Cleanup on component unmount
    return () => {
      if (ws.current?.connected) {
        ws.current.deactivate()
      }
    }
  }, [])
  return (
    <CommentContext.Provider
      value={{
        isReady: isReady,
        ws: ws.current || undefined,
        comment: comment,
        setComment: setComment
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
