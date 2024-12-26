import WebSocket from "ws";

export interface ExtendedWebSocket extends WebSocket {
    name?: string;
    otherName?: string | null;
}

export interface Message {
  type: string;
  [key: string]: any;
}

export interface MessageHandlerProps {
  connection: ExtendedWebSocket,
  data: Message,
  users: { [key: string]: ExtendedWebSocket }
}