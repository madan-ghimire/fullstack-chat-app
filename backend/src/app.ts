import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.route";
import messageRoutes from "@/routes/message.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "🚀 MERN chat app REST API is up and running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

export default app;
