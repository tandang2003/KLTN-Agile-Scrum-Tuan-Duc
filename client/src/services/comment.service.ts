import httpService from '@/services/http.service'
import { CommentReqType, CommentResType } from '@/types/comment.type.ts'
import { Id } from '@/types/other.type'
import { AppMessageCallbackType, MessageResponse } from '@/types/socket.type'
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
    callback: AppMessageCallbackType<
      MessageResponse<CommentResType | CommentResType[]>
    >
  ) => {
    return ws.subscribe(`/topic/issue/room/${issueId}`, (value) => {
      const body: MessageResponse<CommentResType | CommentResType[]> =
        JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  },

  getComment: async (issueId: Id) => {
    const res = await httpService.get<CommentResType[]>(`/comments/${issueId}`)
    return res.data
  },
  deleteComment: async (issueId: Id, id: Id) => {
    const res = await httpService.delete<void>(`/comments/${issueId}/${id}`)
    return res.data
  }
}

function isCreateComment(
  res: MessageResponse<CommentResType | CommentResType[]>
): res is { type: 'COMMENT_CREATE'; message: CommentResType } {
  return res.type === 'COMMENT_CREATE'
}

function isDeleteComment(
  res: MessageResponse<CommentResType | CommentResType[]>
): res is { type: 'COMMENT_DELETE'; message: CommentResType[] } {
  return res.type === 'COMMENT_DELETE'
}
export { isCreateComment, isDeleteComment }
export default commentService
