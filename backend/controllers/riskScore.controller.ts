// controllers/riskScore.controller.ts

import { Request, Response } from 'express';
import { calculateRiskScore } from '../services/riskScore.service';

// POST /api/risk-score/calculate
export const calculateScore = (req: Request, res: Response) => {
  try {
    const {
      weather_severity,
      traffic_level,
      crime_score,
      hail_sensitive,
      wind_sensitive
    } = req.body;

    if (
      weather_severity === undefined ||
      traffic_level === undefined ||
      crime_score === undefined
    ) {
      return res.status(400).json({ error: 'Missing required risk inputs' });
    }

    const result = calculateRiskScore({
      weather_severity,
      traffic_level,
      crime_score,
      hail_sensitive: hail_sensitive ?? false,
      wind_sensitive: wind_sensitive ?? false
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('Risk score calculation error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
