import { useDeleteCommentMutation } from '@/feature/issue/issue.api'
import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import { createCtx } from '@/lib/context.helper'
import { uuid } from '@/lib/utils'
import commentService, {
  isCreateComment,
  isDeleteComment
} from '@/services/comment.service'
import { CommentResType } from '@/types/comment.type.ts'
import { Id } from '@/types/other.type'
import { Client } from '@stomp/stompjs'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type CommentContextType = {
  issueId: Id
  isReady: boolean
  ws?: Client
  pushComment: (val: string) => void
  deleteComment: (id: Id) => void
  comment?: CommentResType[]
}

const [useCommentContext, CommentContextProvider] =
  createCtx<CommentContextType>()

type CommentProviderProps = {
  children?: ReactNode
  initValue?: CommentResType[]
  issueId: Id
}
const CommentProvider = ({
  children,
  issueId,
  initValue = []
}: CommentProviderProps) => {
  const auth = useAuth()
  const [comment, setComment] = useState<CommentResType[]>(initValue)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const [action] = useDeleteCommentMutation()

  const { ws, isReady } = useStompClient({
    accessToken: auth.accessToken,
    onConnect: (client) => {
      console.log('✅ WebSocket comment connected')
      // Unsubscribe previous if reconnecting
      unsubscribeRef.current?.()

      const subscriptionPushComment = commentService.receiveComment(
        client,
        issueId,
        ({ bodyParse: response }) => {
          if (isCreateComment(response)) {
            commentService.getComment(issueId).then((res) => {
              const data = res.map((item) => ({
                id: item.id,
                content: item.content,
                createdAt: item.createdAt,
                from: item.from
              }))
              return setComment(data)
            })
            const { message } = response
            if (auth?.user?.uniId && message.from !== auth?.user?.uniId)
              toast(`Nhận tin nhắn mới từ ${message.from}`, {
                description: message.content
              })
          }
          if (isDeleteComment(response)) {
            const { message } = response
            setComment([...message])
          }
        }
      )

      unsubscribeRef.current = () => subscriptionPushComment.unsubscribe()
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected')
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

  useEffect(() => {
    setComment(initValue)
  }, [initValue])

  useEffect(() => {
    console.log(comment)
  }, [comment])

  const handlePushComment = (val: string) => {
    if (issueId && isReady && ws) {
      if (val.trim() === '') {
        return
      }
      commentService.sendComment(ws, issueId, {
        content: val
      })
    }
  }

  const handleDeleteComment = (id: Id) => {
    action({
      id: id,
      issueId: issueId
    })
      .unwrap()
      .then(() => {
        toast.info('Xóa comment thành công')
      })
  }

  return (
    <CommentContextProvider
      value={{
        issueId: issueId,
        isReady: isReady,
        ws: ws || undefined,
        comment: comment,
        pushComment: handlePushComment,
        deleteComment: handleDeleteComment
      }}
    >
      {children}
    </CommentContextProvider>
  )
}
export { CommentProvider, useCommentContext }
