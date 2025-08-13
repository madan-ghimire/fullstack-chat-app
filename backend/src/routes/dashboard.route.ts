import { getDashboardStats } from "../controllers/dashboard.controller";
import { protectRoute } from "../middleware/auth.middleware";
import express, { RequestHandler } from "express";

const router = express.Router();

router.get(
  "/",
  protectRoute as RequestHandler,
  getDashboardStats as RequestHandler
);

export default router;
