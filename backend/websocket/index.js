import { WebSocketServer } from "ws";
import { joinRoom, loadLastMessages, sendMessage } from "./chatHandler.js";

export default function initWebSocketServer(server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("Client Connected!");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "join_room") {
          // calling the joinRoom funciton and load messages
          await joinRoom(ws, data);
        } else if (data.type === "send_message") {
          await sendMessage(ws, data);
        } else if (data.type === "load_last_messages") {
          await loadLastMessages(ws, data);
        }
        //   else if (data.type === "leave_room") {// closing connection}
      } catch (err) {
        console.log(err);
      }
    });
    ws.on("close", () => {
      console.log("connection closed");
    });
  });
}
