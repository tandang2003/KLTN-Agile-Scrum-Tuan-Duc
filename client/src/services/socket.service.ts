import { MessageResponse, TimeMessageResponse } from '@/types/notification.type'
import { ReceiveMessageFnType } from '@/types/socket.type'

const socketService: {
  receiveMessageTime: ReceiveMessageFnType<MessageResponse<TimeMessageResponse>>
} = {
  receiveMessageTime: (ws, callback) => {
    return ws.subscribe(`/topic/time`, (value) => {
      const body: MessageResponse<TimeMessageResponse> = JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  }
}

export default socketService
