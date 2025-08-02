// services/route.service.ts

import pool from '../config/db';

export interface Route {
  id: string;
  user_id: string;
  origin: string;
  destination: string;
  route_geometry?: any; // optional: polyline/GeoJSON
  risk_score?: number;
  duration_minutes?: number;
  created_at: Date;
}

/**
 * Create a new route entry for a user
 */
export const createRoute = async (
  userId: string,
  origin: string,
  destination: string,
  route_geometry?: any,
  risk_score?: number,
  duration_minutes?: number
): Promise<Route> => {
  const result = await pool.query(
    `INSERT INTO routes (
      user_id, origin, destination, route_geometry, risk_score, duration_minutes
     )
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, origin, destination, route_geometry, risk_score, duration_minutes]
  );

  return result.rows[0];
};

/**
 * Fetch all past routes for a user
 */
export const getUserRoutes = async (userId: string): Promise<Route[]> => {
  const result = await pool.query(
    `SELECT * FROM routes WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

/**
 * Fetch a single route by ID
 */
export const getRouteById = async (routeId: string): Promise<Route | null> => {
  const result = await pool.query(
    `SELECT * FROM routes WHERE id = $1`,
    [routeId]
  );

  return result.rows[0] || null;
};
