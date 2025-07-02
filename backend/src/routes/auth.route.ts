import {
  checkAuth,
  logout,
  signin,
  signup,
  updateProfile,
} from "@/controllers/auth.controller";
import { protectRoute } from "@/middleware/auth.middleware";
import express, { RequestHandler } from "express";

const router = express.Router();

router.post("/signup", signup as RequestHandler);

router.post("/login", signin as RequestHandler);

router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute as RequestHandler,
  updateProfile as RequestHandler
);

router.get(
  "/check",
  protectRoute as RequestHandler,
  checkAuth as RequestHandler
);

export default router;
