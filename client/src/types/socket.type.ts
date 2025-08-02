import { Id } from '@/types/other.type'
import { Client, IMessage, StompSubscription } from '@stomp/stompjs'
type AppIMessage<T> = IMessage & {
  bodyParse: T
}

type AppMessageCallbackType<T> = (message: AppIMessage<T>) => void

type ReceiveMessageFnType<T> = (
  ws: Client,
  callback: AppMessageCallbackType<T>
) => StompSubscription

type MessageResponse<T> = {
  type:
    | 'UPDATE'
    | 'PREDICT'
    | 'TIME'
    | 'COMMENT_CREATE'
    | 'COMMENT_DELETE'
    | 'SNAPSHOT'
  message: T
  senderId?: Id
  uniId?: Id
}

export type {
  AppIMessage,
  AppMessageCallbackType,
  ReceiveMessageFnType,
  MessageResponse
}
