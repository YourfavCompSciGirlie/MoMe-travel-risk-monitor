// routes/dashboardRoutes.ts

import express from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// All dashboard routes require authentication
router.use(authMiddleware);

// GET /api/dashboard/summary
router.get('/summary', getDashboardSummary);

export default router;
