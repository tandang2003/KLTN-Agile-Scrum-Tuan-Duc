import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client/dist/sockjs";
import envConfig from "@/configuration/env.config.ts";
import {Client, CompatClient, Stomp} from "@stomp/stompjs";
import {useAppSelector} from "@/context/redux/hook.ts";
import {CommentResType} from "@/types/comment.type.ts";

type ContextCommentType = {
  isReady: boolean,
  ws: Client,
  comment?: CommentResType[];
}

const ContextComment = createContext<ContextCommentType | undefined>(undefined)

export const useContextComment = () => {
  const context = useContext(ContextComment);
  if (!context) {
    throw new Error('useContextComment must be used inside ProviderCommentProvider');
  }
  return context;
};

type ProviderCommentProviderProps = {
  children?: ReactNode
}

export const ProviderCommentProvider = ({children}: ProviderCommentProviderProps) => {
  const accessToken = useAppSelector(state => state.authSlice.accessToken)
  const [isReady, setIsReady] = useState<boolean>(false)
  const ws = useRef<CompatClient>(null)

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const socket = new SockJS(`${envConfig.BACKEND_URL}/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.connectHeaders = headers
    stompClient.onConnect = () => {
      console.log('Connected to WebSocket')
      setIsReady(stompClient.connected)
    }

    stompClient.onDisconnect = () => {
      console.log("Disconnect")
    }
    stompClient.activate()
    ws.current = stompClient

    // Cleanup on component unmount
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate()
      }
    }
  }, [])
  return <ContextComment.Provider value={{
    isReady: isReady,
    ws: ws.current!
  }}>
    {children}
  </ContextComment.Provider>
}