import { Client } from '@stomp/stompjs'
import { CommentReqType, CommentResType } from '@/types/comment.type.ts'
import { IMessage } from '@stomp/stompjs'
import { ResponseApi } from '@/types/http.type'
import httpService from '@/services/http.service'

type AppIMessage<T> = IMessage & {
  bodyParse: T
}

type AppMessageCallbackType<T> = (message: AppIMessage<T>) => void

const commentService = {
  sendComment: (ws: Client, issueId: string, req: CommentReqType) => {
    ws.publish({
      destination: `/app/issue/${issueId}`,
      body: JSON.stringify(req)
    })
  },
  receiveComment: (
    ws: Client,
    issueId: string,
    callback: AppMessageCallbackType<CommentResType>
  ) => {
    return ws.subscribe(`/topic/room/${issueId}`, (value) => {
      const body: CommentResType = JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  },
  getComment: async (issueId: string) => {
    const res = await httpService.get<ResponseApi<CommentResType[]>>(
      `/comment/${issueId}`
    )
    return res.data.data
  }
}

export default commentService
