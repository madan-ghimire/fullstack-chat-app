import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import app from "@/app";
import { connectDB } from "@/lib/db";

import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const PORT = process.env.PORT;

(async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    // If using Socket.IO
    const io = new SocketIOServer(server, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
    });

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit();
  }
})();
