// controllers/alert.controller.ts

import { Request, Response } from 'express';
import * as alertService from '../services/alert.service';

// POST /api/alerts
export const createAlert = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const {
      alert_type,
      severity,
      message,
      location,
      route_id,
      weather_type
    } = req.body;

    if (!alert_type || !severity || !message || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const alert = await alertService.createAlert(
      userId,
      alert_type,
      severity,
      message,
      location,
      route_id,
      weather_type
    );

    return res.status(201).json({ message: 'Alert created', alert });
  } catch (err) {
    console.error('Create alert error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/alerts
export const getUserAlerts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const alerts = await alertService.getUserAlerts(userId);

    return res.status(200).json(alerts);
  } catch (err) {
    console.error('Get alerts error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
