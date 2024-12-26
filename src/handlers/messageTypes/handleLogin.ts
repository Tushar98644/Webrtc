import { ExtendedWebSocket, Message } from "../../types";
import { sendTo } from "../../utils/sendTo";

export const handleLogin = (
    connection: ExtendedWebSocket,
    data: Message,
    users: { [key: string]: ExtendedWebSocket }
): void => {
  console.log("User attempting to log in with username:", data.name);

  if (!data.name) {
    sendTo(connection, {
      type: "error",
      message: "Username is required for login",
    });
    return;
  }

  if (users[data.name]) {
    console.log("Login failed: Username already taken:", data.name);
    sendTo(connection, {
      type: "login",
      success: false,
      message: "Username already taken",
    });
  } else {
    console.log("Login successful for username:", data.name);
    users[data.name] = connection;
    connection.name = data.name;
    sendTo(connection, {
      type: "login",
      success: true,
      message: "Login successful",
    });
  }
};
