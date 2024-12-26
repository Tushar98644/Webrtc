import { ExtendedWebSocket, Message } from "../../types";
import { sendTo } from "../../utils/sendTo";

export const handleAnswer = (
  connection: ExtendedWebSocket,
  data: Message,
  users: { [key: string]: ExtendedWebSocket }
): void => {
  console.log("Sending answer to: ", data.name);

  var conn = users[data.name];

  if (conn != null) {
    connection.otherName = data.name;
    sendTo(conn, {
      type: "answer",
      answer: data.answer,
    });
  }
};
