import { TimeMessageResponse } from '@/types/notification.type'
import { MessageResponse, ReceiveMessageFnType } from '@/types/socket.type'

const socketService: {
  receiveMessageTime: ReceiveMessageFnType<MessageResponse<TimeMessageResponse>>
} = {
  receiveMessageTime: (ws, callback) => {
    return ws.subscribe(`/topic/app`, (value) => {
      const body: MessageResponse<TimeMessageResponse> = JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  }
}

export default socketService
