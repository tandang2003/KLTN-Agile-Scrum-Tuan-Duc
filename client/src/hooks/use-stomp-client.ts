import { useEffect, useRef, useState } from 'react'
import { CompatClient, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'
import envConfig from '@/configuration/env.config'

type UseStompClientOptions = {
  accessToken?: string | null
  onConnect?: (client: CompatClient) => void
  onDisconnect?: () => void
  onError?: (error: any) => void
}

export const useStompClient = ({
  accessToken,
  onConnect,
  onDisconnect,
  onError
}: UseStompClientOptions) => {
  const ws = useRef<CompatClient | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      console.warn('No access token provided — skipping WebSocket connection.')
      return
    }

    const client = Stomp.over(() => new SockJS(`${envConfig.BACKEND_URL}/ws`))
    client.connectHeaders = {
      Authorization: `Bearer ${accessToken}`
    }

    client.reconnectDelay = 5000
    client.debug = () => {}

    client.onConnect = () => {
      console.log('connect success')
      ws.current = client
      setIsReady(true)
      onConnect?.(client)
    }

    client.onDisconnect = () => {
      setIsReady(false)
      onDisconnect?.()
    }

    client.onStompError = (frame) => {
      console.error('STOMP error', frame)
      onError?.(frame)
    }

    client.activate()

    return () => {
      client.deactivate()
    }
  }, [accessToken])

  return { ws: ws.current, isReady }
}
