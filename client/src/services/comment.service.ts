import httpService from '@/services/http.service'
import { CommentReqType, CommentResType } from '@/types/comment.type.ts'
import { Id } from '@/types/other.type'
import { AppMessageCallbackType } from '@/types/socket.type'
import { Client } from '@stomp/stompjs'

const commentService = {
  sendComment: (ws: Client, issueId: string, req: CommentReqType) => {
    ws.publish({
      destination: `/app/issue/${issueId}`,
      body: JSON.stringify(req)
    })
  },
  receiveComment: (
    ws: Client,
    issueId: Id,
    callback: AppMessageCallbackType<CommentResType>
  ) => {
    return ws.subscribe(`/topic/issue/room/${issueId}`, (value) => {
      const body: CommentResType = JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  },
  getComment: async (issueId: Id) => {
    const res = await httpService.get<CommentResType[]>(`/comments/${issueId}`)
    return res.data
  }
}

export default commentService
