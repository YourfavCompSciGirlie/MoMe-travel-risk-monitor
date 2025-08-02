// routes/userRoutes.ts

import express from 'express';
import {
  getUserProfile,
  updateCurrentUserPreferences,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/preferences", authMiddleware, updateCurrentUserPreferences);

export default router;
