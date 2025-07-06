// socket.ts
import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // { userId: socketId }

export let io: SocketIOServer; // ✅ Exported io

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: { origin: ["http://localhost:5173"] },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // remove later
    // console.log("check socket ", socket.data);

    const userId = socket.handshake.query.userId as string | undefined;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  console.log("✅ Socket.IO server initialized");
};

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initSocket first.");
  }
  return io;
};
