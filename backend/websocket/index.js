import { WebSocketServer } from "ws";
import { joinRoom, sendMessage } from "./chatHandler.js";

export default function initWebSocketServer(server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("Client Connected!");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        // console.log("Receiving from client: ", message.toString());
        if (data.type === "join_room") {
          // calling the joinRoom funciton
          await joinRoom(ws, data);
        } else if (data.type === "send_message") {
          await sendMessage(ws, data);
          console.log(ws,data)
        }
        //   else if (data.type === "leave_room") {}
      } catch (err) {
        console.log(err);
      }
    });
  });
}
