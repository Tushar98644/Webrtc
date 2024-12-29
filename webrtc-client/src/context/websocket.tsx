import { createContext, ReactNode, useEffect, useRef } from "react";
import { createWebSocketConnection } from "@/services/webSocketService";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }:{children:ReactNode}) => {
  const connection = useRef<WebSocket | null>(null);

  useEffect(() => {
    connection.current = createWebSocketConnection();
    console.log("WebSocket connected!");

    return () => {
      console.log("Closing WebSocket...");
      connection.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={connection.current}>
      {children}
    </WebSocketContext.Provider>
  )
};
