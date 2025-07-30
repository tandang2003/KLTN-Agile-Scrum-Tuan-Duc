import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import { uuid } from '@/lib/utils'
import commentService from '@/services/comment.service'
import { CommentResType } from '@/types/comment.type.ts'
import { Id } from '@/types/other.type'
import { Client } from '@stomp/stompjs'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { toast } from 'sonner'
import _ from 'lodash'

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
  issueId: Id
}

export const CommentProvider = ({
  children,
  issueId,
  initValue = []
}: CommentProviderProps) => {
  const auth = useAuth()
  const [comment, setComment] = useState<CommentResType[]>(initValue)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  const { ws, isReady } = useStompClient({
    accessToken: auth.accessToken,
    onConnect: (client) => {
      console.log('✅ WebSocket connected')
      // Unsubscribe previous if reconnecting
      unsubscribeRef.current?.()

      const subscription = commentService.receiveComment(
        client,
        issueId,
        ({ bodyParse: response }) => {
          commentService.getComment(issueId).then((res) => {
            const data = res.map((item) => ({
              id: uuid(),
              content: item.content,
              createdAt: item.createdAt,
              from: item.from
            }))
            return setComment(_.orderBy(data, ['createdAt'], ['desc']))
          })
          if (auth?.user?.uniId && response.from !== auth?.user?.uniId)
            toast(`Nhận tin nhắn mới từ ${response.from}`, {
              description: response.content
            })
        }
      )

      unsubscribeRef.current = () => subscription.unsubscribe()
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected')
    },
    onError: (error) => {
      console.error('WebSocket error', error)
    }
  })

  useEffect(() => {
    setComment(initValue)
  }, [initValue])

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.()
    }
  }, [])

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
