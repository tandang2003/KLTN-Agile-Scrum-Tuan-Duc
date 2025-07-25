import { Client, IMessage } from '@stomp/stompjs'
type AppIMessage<T> = IMessage & {
  bodyParse: T
}

type AppMessageCallbackType<T> = (message: AppIMessage<T>) => void

export type { AppIMessage, AppMessageCallbackType }
