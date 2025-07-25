import { useCommentContext } from '@/components/issue/comment/ContextComment'
import ItemComment from '@/components/issue/comment/ItemComment'
import { useAppSelector } from '@/context/redux/hook'
import { useAuth } from '@/hooks/use-auth'
import { uuid } from '@/lib/utils'
import commentService from '@/services/comment.service'
import { useEffect } from 'react'
import { toast } from 'sonner'
import _ from 'lodash'
import ListView from '@/components/ListView'

const ListComment = () => {
  const issueId = useAppSelector((state) => state.issueSlice.current?.id)
  const auth = useAuth()
  const { isReady, ws, setComment, comment } = useCommentContext()
  useEffect(() => {
    if (!issueId || !ws || !isReady || !ws.connected) return
    // toast.message('Subscribe comment')
    const subscriber = commentService.receiveComment(
      ws,
      issueId,
      ({ bodyParse: response }) => {
        setComment?.([
          {
            id: uuid(),
            from: response.from,
            content: response.content,
            createdAt: response.createdAt
          },
          ...(comment ?? [])
        ])
        if (auth?.user?.uniId && response.from !== auth?.user?.uniId)
          toast(`Nhận tin nhắn mới từ ${response.from}`)
      }
    )

    return () => {
      return subscriber.unsubscribe()
    }
  }, [ws, isReady, setComment, issueId])
  return (
    <ListView
      data={_.orderBy(comment, ['createdAt'], ['asc'])}
      render={(item) => {
        return (
          <ItemComment
            key={item?.id ?? uuid()}
            name={item.from}
            message={item.content}
            createdAt={item.createdAt}
          />
        )
      }}
    ></ListView>
  )
}

export default ListComment
