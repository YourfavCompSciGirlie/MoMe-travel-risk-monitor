// routes/alertRoutes.ts

import express from 'express';
import {
  createAlert,
  getUserAlerts
} from '../controllers/alert.controller';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// All alert routes require authentication
router.use(authMiddleware);

// POST /api/alerts
router.post('/', createAlert);

// GET /api/alerts
router.get('/', getUserAlerts);

export default router;
