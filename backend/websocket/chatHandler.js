import connectDB from "../config/db.js";

const rooms = new Map();
export const joinRoom = async (ws, data) => {
  const { roomId, receiverId, senderId } = data; // getting room id and case of missing
  if (!roomId) {
    return ws.send(
      JSON.stringify({ type: "error", message: "Room ID is missing" }),
    );
  }
  if (!senderId || !receiverId) {
    return ws.send(
      JSON.stringify({ type: "error", message: "Users Id is missing!" }),
    );
  }
  // if the room is missing create it like ({roomId: Set[user1,user2]})
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  try {
    let db = await connectDB();
    const roomCollection = db.collection("rooms");
    const roomCollExisting = await roomCollection.findOne({
      _id: roomId.toString(),
    });
    if (!roomCollExisting) {
      await roomCollection.insertOne({
        _id: roomId.toString(),
        members: [receiverId, senderId],
        type: "direct", // for future will be added to group,channel
        createdBy: "", // this also about channel/group-owner,creator
        createdAt: new Date(),
        lastMessage: {
          text: "Last Message to show", // changable $set
          senderId: senderId,
        },
      });
    } else {
      // if exist just updating
      await roomCollection.updateOne(
        { _id: roomId.toString() },
        {
          $set: {
            members: [receiverId, senderId],
            updatedAt: new Date(),
          },
        },
      );
    }
  } catch (err) {
    console.log(err);
    ws.send(JSON.stringify({ type: "error", message: "Error with DB" }));
    return;
  }
  // WebSocket memory room
  rooms.get(roomId).add(ws);
  ws.send(JSON.stringify({ type: "joined_room", roomId }));
};

export const sendMessage = async (ws, data) => {
  const { roomId, senderId, receiverId, text } = data;
  if (!roomId || !senderId || !receiverId || !text) {
    ws.send(
      JSON.stringify({ type: "error", message: "Missing required fields" }),
    );
  }
  if (!rooms.has(roomId)) {
    ws.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
  }
  const room = rooms.get(roomId);
  // chat gpt chat for ws flow
};
