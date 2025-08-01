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
  type: 'UPDATE' | 'PREDICT' | 'TIME' | 'COMMENT_CREATE' | 'COMMENT_DELETE'
  message: T
}

export type {
  AppIMessage,
  AppMessageCallbackType,
  ReceiveMessageFnType,
  MessageResponse
}
