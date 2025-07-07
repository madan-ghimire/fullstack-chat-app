// import {
// getMessages,
// getUsersForSidebar,
// sendMessage,
// } from "@/controllers/message.controller";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller";
// import { protectRoute } from "@/middleware/auth.middleware";
import { protectRoute } from "../middleware/auth.middleware";
import express, { RequestHandler } from "express";

const router = express.Router();

router.get("/users", protectRoute as RequestHandler, getUsersForSidebar);
router.get("/:id", protectRoute as RequestHandler, getMessages);
router.post(
  "/send/:id",
  protectRoute as RequestHandler,
  sendMessage as RequestHandler
);

export default router;
