import { useCommentContext } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'
import { useAppSelector } from '@/context/redux/hook'
import { uuid } from '@/lib/utils'
import { CommentResType } from '@/types/comment.type'
import { useEffect } from 'react'

const ListComment = () => {
  const issueId = useAppSelector((state) => state.issueSlice.current?.id)
  const { isReady, ws, setComment, comment } = useCommentContext()
  useEffect(() => {
    if (!issueId || !ws || !isReady || !ws.connected) return
    // toast.message('Subscribe comment')
    const subscriber = ws.subscribe(`/topic/room/${issueId}`, (value) => {
      const response: CommentResType = JSON.parse(value.body)
      setComment?.([
        {
          id: uuid(),
          from: response.from,
          content: response.content,
          createdAt: response.createdAt
        },
        ...(comment ?? [])
      ])

      // toast.message('Receive message')
    })
    return () => {
      // toast.message('Unsubscribe comment')
      return subscriber.unsubscribe()
    }
  }, [ws, isReady, setComment, issueId])
  return (
    <div>
      {comment?.map((item) => {
        return (
          <ItemComment
            key={item?.id ?? uuid()}
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
