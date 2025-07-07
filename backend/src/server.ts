import dotenv from "dotenv";
import http from "http";
import app from "./app";
// import { connectDB } from "@/lib/db";
import { connectDB } from "./lib/db";
// import { initSocket } from "@/lib/socket";
import { initSocket } from "./lib/socket";

dotenv.config();

const PORT = process.env.PORT;

(async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    initSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit();
  }
})();
