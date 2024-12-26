import { ExtendedWebSocket, Message } from "../../types";
import { sendTo } from "../../utils/sendTo";

export const handleLeave = (
  connection: ExtendedWebSocket,
  data: Message,
  users: { [key: string]: ExtendedWebSocket }
): void => {
  console.log("Disconnecting from", data.name);
  var conn = users[data.name];
  connection.otherName = null;

  //notify the other user so he can disconnect his peer connection
  if (conn != null) {
    sendTo(conn, {
      type: "leave",
    });
  }
};
