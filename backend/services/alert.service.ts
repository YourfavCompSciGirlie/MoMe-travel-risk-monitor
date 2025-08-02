// services/alert.service.ts

import pool from '../config/db';

export interface Alert {
  id: string;
  user_id: string;
  alert_type: string;       // NEW: e.g., 'weather', 'crime'
  weather_type?: string;    // Optional — only if alert_type === 'weather'
  severity: number;
  message: string;
  location: string;
  route_id?: string;
  timestamp: Date;
}

/**
 * Create a new weather alert (logged for a user)
 */
export const createAlert = async (
  userId: string,
  alert_type: string,
  severity: number,
  message: string,
  location: string,
  route_id?: string,
  weather_type?: string
): Promise<Alert> => {
  const result = await pool.query(
    `INSERT INTO alerts (
      user_id, alert_type, severity, message,
      location, route_id, weather_type
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [userId, alert_type, severity, message, location, route_id, weather_type]
  );

  return result.rows[0];
};

export const createWeatherAlertForRoute = async (
  userId: string,
  routeId: string,
  weather_type: string,
  severity: number,
  message: string,
  location: string
) => {
  return createAlert(userId, 'weather', severity, message, location, routeId, weather_type);
};

/**
 * Get all alerts for a user
 */
export const getUserAlerts = async (userId: string): Promise<Alert[]> => {
  const result = await pool.query(
    `SELECT * FROM alerts WHERE user_id = $1 ORDER BY timestamp DESC`,
    [userId]
  );

  return result.rows;
};
