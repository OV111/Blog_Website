const rooms = new Map();
export const joinRoom = (ws, data) => {
  const { roomId } = data; // getting room id and case of missing
  if (!roomId) {
    ws.send(JSON.stringify({ type: "error", message: "Room ID is missing" }));
  }
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(ws);
  ws.send(JSON.stringify({ type: "joined_room", roomId }));
};

export const sendMessage = (ws, data) => {};
