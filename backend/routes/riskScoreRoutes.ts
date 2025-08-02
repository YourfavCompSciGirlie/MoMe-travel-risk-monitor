// routes/riskScoreRoutes.ts

import express from 'express';
import { calculateScore } from '../controllers/riskScore.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// POST /api/risk-score/calculate
router.post('/calculate', authMiddleware, calculateScore);

export default router;
