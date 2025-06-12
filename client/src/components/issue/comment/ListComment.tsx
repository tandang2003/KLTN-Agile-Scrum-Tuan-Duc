import { useContextComment } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'
import { useAppSelector } from '@/context/redux/hook'
import { uuid } from '@/lib/utils'
import { CommentResType } from '@/types/comment.type'
import { useEffect } from 'react'
import { toast } from 'sonner'

const ListComment = () => {
  const issueId = useAppSelector((state) => state.issueSlice.current?.id)
  const { isReady, ws, setComment, comment } = useContextComment()
  useEffect(() => {
    if (ws && isReady && ws.connected) {
      const subscriber = ws.subscribe(`/topic/room/${issueId}`, (value) => {
        const response: CommentResType = JSON.parse(value.body)
        setComment?.([
          {
            id: uuid(),
            from: response.from,
            content: response.content,
            createdAt: new Date()
          },
          ...(comment ?? [])
        ])

        toast.message('Receive message')
      })
      return () => {
        return subscriber.unsubscribe()
      }
    }
  }, [ws, isReady])
  return (
    <div>
      {comment?.map((item) => {
        return (
          <ItemComment
            key={item.id}
            name={item.from}
            message={item.content}
            createdAt={item.createdAt}
          />
        )
      })}
    </div>
  )
}

export default ListComment
