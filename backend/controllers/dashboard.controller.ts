// controllers/dashboard.controller.ts

import { Request, Response } from 'express';
import { getUserDashboardStats } from '../services/dashboard.service';

// GET /api/dashboard/summary
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stats = await getUserDashboardStats(userId);
    return res.status(200).json(stats);
  } catch (err) {
    console.error('Dashboard summary error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
