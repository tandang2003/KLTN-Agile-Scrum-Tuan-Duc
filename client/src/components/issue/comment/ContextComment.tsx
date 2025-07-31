import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import { CommentResType } from '@/types/comment.type.ts'
import { Client } from '@stomp/stompjs'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

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
  const auth = useAuth()
  const [comment, setComment] = useState<CommentResType[]>(initValue)
  useEffect(() => {
    if (initValue) {
      setComment(initValue)
    }
  }, [initValue])
  const { ws, isReady } = useStompClient({
    accessToken: auth.accessToken,
    onConnect: (_) => {
      console.log('✅ WebSocket connected')
      // You can subscribe here if needed
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected')
    },
    onError: (error) => {
      console.error('WebSocket error', error)
    }
  })
  return (
    <CommentContext.Provider
      value={{
        isReady: isReady,
        ws: ws || undefined,
        comment: comment,
        setComment: setComment
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
