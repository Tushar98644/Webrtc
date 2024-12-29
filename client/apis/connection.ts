import { loginHandler } from "../handlers/login";
import { createWebSocketConnection } from "@/services/webSocketService";

const connection = createWebSocketConnection();

const loginInput = document.querySelector("#loginInput") as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;
const loginPage = document.querySelector("#loginPage") as HTMLDivElement;
const callPage = document.querySelector("#callPage") as HTMLDivElement;

if (!loginInput || !loginBtn) {
  console.error("Required elements not found in the DOM!");
}

var connectedUser: any;

const handleLogin = () => {
  const name = loginInput?.value;
  console.log("The name in the input:", name);

  if (name.length > 0) {
    sendMessage({
      name: name,
      type: "login",
    });
  }
};

loginBtn.addEventListener("click", handleLogin);

connection.onmessage = (message) => {
  console.log("Got message", message.data);
  const data = JSON.parse(message.data);

  switch (data.type) {
    case "login":
      loginHandler(data.success,sendMessage);
      break;
    default:
      break;
  }
};

const sendMessage = (message: any) => {
  if (connectedUser) message.name = connectedUser;

  connection.send(JSON.stringify(message));
};
