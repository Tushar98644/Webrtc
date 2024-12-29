import { wsUrl } from "../config/wsConfig";

export const createWebSocketConnection = (): WebSocket => {
  const connection = new WebSocket(wsUrl);

  connection.onopen = () => {
    console.log("Connection was created!");
  };

  connection.onerror = (err) => {
    console.error("An error occurred:", err);
  };

  connection.onclose = () => {
    console.log("Connection was closed!");
  };

  return connection;
};

export const sendMessage = (connection: WebSocket, message: any, connectedUser?: string) => {
  if (connectedUser) message.name = connectedUser;
  connection.send(JSON.stringify(message));
};
