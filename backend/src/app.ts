import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.route";
import messageRoutes from "@/routes/message.route";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "🚀 MERN chat app REST API is up and running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
