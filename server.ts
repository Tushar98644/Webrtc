import WebSocket from "ws";
import http from "http";

const server = http.createServer();

const wss = new WebSocket.Server({ server });

interface ExtendedWebSocket extends WebSocket {
  name?: string;
  otherName?: string | null;
}

var users: { [key: string]: ExtendedWebSocket } = {};

interface Message {
  type: string;
  [key: string]: any;
}

const sendTo = (connection: ExtendedWebSocket, message: Message) => {
  connection.send(JSON.stringify(message));
};

wss.on("connection", (connection: ExtendedWebSocket) => {
  console.log("New connection");
  connection.send("Welcome to the chat room");

  connection.on("message", (msg) => {
    var data;
    try {
      data = JSON.parse(msg.toString());
    } catch (e) {
      data = {};
      console.log("Error parsing JSON");
    }
    console.log(`Received message: ${data}`);

    switch (data.type) {
      case "login":
        console.log("User logged in as", data.name);
        if (users[data.name]) {
          sendTo(connection, {
            type: "login",
            success: false,
          });
        } else {
          users[data.name] = connection;
          connection.name = data.name;
          sendTo(connection, {
            type: "login",
            success: true,
          });
        }

        break;

      case "offer":
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

        break;

      case "answer":
        console.log("Sending answer to: ", data.name);

        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;
          sendTo(conn, {
            type: "answer",
            answer: data.answer,
          });
        }

        break;

      case "candidate":
        console.log("Sending candidate to:", data.name);
        var conn = users[data.name];

        if (conn != null) {
          sendTo(conn, {
            type: "candidate",
            candidate: data.candidate,
          });
        }

        break;
        
      case "leave":
        console.log("Disconnecting from", data.name);
        var conn = users[data.name];
        connection.otherName = null;

        //notify the other user so he can disconnect his peer connection
        if (conn != null) {
          sendTo(conn, {
            type: "leave",
          });
        }

        break;
      default:
        sendTo(connection, {
          type: "error",
          message: "Command no found: " + data.type,
        });

        break;
    }
  });

  connection.on("close", function () {
    if (connection.name) {
      delete users[connection.name];

      if (connection.otherName) {
        console.log("Disconnecting from ", connection.otherName);
        var conn = users[connection.otherName];
        conn.otherName = null;

        if (conn != null) {
          sendTo(conn, {
            type: "leave",
          });
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
