import { ExtendedWebSocket, Message } from "../types";
import { sendTo } from "../utils/sendTo";
import { handleLogin } from "./messageTypes/handleLogin";
import { handleOffer } from "./messageTypes/handleOffer";
import { handleAnswer } from "./messageTypes/handleAnswer";
import { handleCandidate } from "./messageTypes/handleCandidate";
import { handleLeave } from "./messageTypes/handleLeave";

export const handleMessage = (
  connection: ExtendedWebSocket,
  messageString: string,
  users: { [key: string]: ExtendedWebSocket }
) => {
  let data: Message;
  try {
    data = JSON.parse(messageString);
  } catch (e) {
    console.log("Error parsing JSON");
    sendTo(connection, { type: "error", message: "Invalid JSON format" });
    return;
  }

  switch (data.type) {
    case "login":
      handleLogin(connection, data, users);
      break;
    case "offer":
      handleOffer(connection, data, users);
      break;
    case "answer":
      handleAnswer(connection, data, users);
      break;
    case "candidate":
      handleCandidate(connection, data, users);
      break;
    case "leave":
      handleLeave(connection, data, users);
      break;
    default:
      sendTo(connection, { type: "error", message: `Unknown command: ${data.type}` });
      break;
  }
};