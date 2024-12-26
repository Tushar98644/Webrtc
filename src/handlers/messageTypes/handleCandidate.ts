import { ExtendedWebSocket, Message } from "../../types";
import { sendTo } from "../../utils/sendTo";

export const handleCandidate = (
  connection: ExtendedWebSocket,
  data: Message,
  users: { [key: string]: ExtendedWebSocket }
): void => {
  console.log("Sending candidate to:", data.name);
  var conn = users[data.name];

  if (conn != null) {
    sendTo(conn, {
      type: "candidate",
      candidate: data.candidate,
    });
  }
};
