const rooms = new Map();
export const joinRoom = (ws, data) => {
  const { roomId } = data; // getting room id and case of missing
  if (!roomId) {
    ws.send(JSON.stringify({ type: "error", message: "Room ID is missing" }));
  }
  // if the room is missing create it like ({roomId: Set[user1,user2]})
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(ws);
  ws.send(JSON.stringify({ type: "joined_room", roomId }));
};

export const sendMessage = (ws, data) => {
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
