// routes/alertRoutes.ts

import express from 'express';
import {
  createAlert,
  getUserAlerts,
  updateAlertStatus,
} from "../controllers/alert.controller";

import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// All alert routes require authentication
router.use(authMiddleware);

// POST /api/alerts
router.post("/", createAlert);

// GET /api/alerts
router.get("/", getUserAlerts);

// UPDATE /api/alerts
router.put("/:alertId", updateAlertStatus);

export default router;
