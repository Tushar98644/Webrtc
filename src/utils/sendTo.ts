import { ExtendedWebSocket, Message } from "../types";

export const sendTo = (connection: ExtendedWebSocket, message: Message) => {
  connection.send(JSON.stringify(message));
};