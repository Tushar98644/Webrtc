import { ExtendedWebSocket, Message } from "../../types";
import { sendTo } from "../../utils/sendTo";

export const handleOffer = (
    connection: ExtendedWebSocket,
    data: Message,
    users: { [key:string] : ExtendedWebSocket }
):void => {
    console.log("Sending offer to: ", data.name);

        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;

          sendTo(conn, {
            type: "offer",
            offer: data.offer,
            name: connection.name,
          });
        }

}