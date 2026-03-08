import { WebSocketServer } from "ws";
import { joinRoom } from "./chatHandler.js";

export default function initWebSocketServer(server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("Client Connected!");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("Receiving from client: ", message.toString());
        if (data.type === "join_room") {
          // calling the joinRoom funciton
          joinRoom(ws, data);

          //   } else if (data.type === "send_message") {
          //   } else if (data.type === "leave_room") {
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}
