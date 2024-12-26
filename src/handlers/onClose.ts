import { ExtendedWebSocket } from "../types";
import { sendTo } from "../utils/sendTo";

export const handleClose = (
  connection: ExtendedWebSocket,
  users: { [key: string]: ExtendedWebSocket }
) => {
  if (connection.name) {
    delete users[connection.name];

    if (connection.otherName) {
      console.log("Disconnecting from", connection.otherName);
      const otherConnection = users[connection.otherName];
      if (otherConnection) {
        otherConnection.otherName = null;
        sendTo(otherConnection, { type: "leave" });
      }
    }
  }
  console.log("Connection closed");
};
