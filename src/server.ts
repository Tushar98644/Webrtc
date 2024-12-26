import WebSocket from "ws";
import http from "http";
import { handleConnection } from "./handlers/onConnection";

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection",handleConnection);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
