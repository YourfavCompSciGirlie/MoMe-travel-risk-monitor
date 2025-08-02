// controllers/route.controller.ts

import { Request, Response } from 'express';
import { calculateRiskScore } from '../services/riskScore.service';
import * as routeService from '../services/route.service';

// POST /api/routes
export const createRoute = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const {
        origin,
        destination,
        route_geometry,
        weather_severity,
        traffic_level,
        crime_score,
        hail_sensitive,
        wind_sensitive,
        duration_minutes
    } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    // Calculate risk score
    const riskResult = calculateRiskScore({
        weather_severity,
        traffic_level,
        crime_score,
        hail_sensitive: hail_sensitive ?? false,
        wind_sensitive: wind_sensitive ?? false
    });

    // Store it in the route
    const route = await routeService.createRoute(
        userId,
        origin,
        destination,
        route_geometry,
        riskResult.score,
        duration_minutes
    );

    return res.status(201).json({ message: 'Route created', route });
  } catch (err) {
    console.error('Create route error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/routes
export const getUserRoutes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const routes = await routeService.getUserRoutes(userId);
    return res.status(200).json(routes);
  } catch (err) {
    console.error('Get user routes error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/routes/:routeId
export const getRouteById = async (req: Request, res: Response) => {
  try {
    const routeId = req.params.routeId;

    const route = await routeService.getRouteById(routeId);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    return res.status(200).json(route);
  } catch (err) {
    console.error('Get route by ID error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
