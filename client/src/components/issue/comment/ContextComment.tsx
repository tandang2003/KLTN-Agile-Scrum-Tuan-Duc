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
  ws: Client
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
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const socket = new SockJS(`${envConfig.BACKEND_URL}/ws`)
    const stompClient = Stomp.over(socket)
    stompClient.connectHeaders = headers
    stompClient.reconnectDelay = 5000
    stompClient.debug = () => {}
    stompClient.onConnect = () => {
      // console.log('Connected to WebSocket')
      setIsReady(stompClient.connected)
    }

    stompClient.onStompError = (_frame) => {
      // console.error('Broker reported error: ' + frame.headers['message'])
      // console.error('Additional details: ' + frame.body)
    }

    stompClient.onDisconnect = () => {
      // console.log('Disconnect')
    }
    stompClient.activate()
    ws.current = stompClient

    // Cleanup on component unmount
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate()
      }
    }
  }, [])
  return (
    <CommentContext.Provider
      value={{
        isReady: isReady,
        ws: ws.current!,
        comment: comment,
        setComment: setComment
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
