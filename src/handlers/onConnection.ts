import { ExtendedWebSocket } from '../types';
import { sendTo } from "../utils/sendTo";
import { handleMessage } from "./onMessage";
import { handleClose } from "./onClose";

const users: { [key: string]: ExtendedWebSocket } = {};

export const handleConnection = (connection: ExtendedWebSocket) => {
  console.log("New connection");
  connection.send("Welcome to the chat room");

  connection.on("message", (msg) => {
    handleMessage(connection, msg.toString(), users);
  });

  connection.on("close", () => {
    handleClose(connection, users);
  });
};
