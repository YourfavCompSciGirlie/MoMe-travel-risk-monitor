// services/dashboard.service.ts

import pool from '../config/db';

export interface DashboardStats {
  avg_risk_score: number;
  total_routes: number;
  total_alerts: number;
  most_common_alert: string | null;
  recent_alerts: {
    message: string;
    timestamp: Date;
    alert_type: string;
    severity: number;
  }[];
  safest_route?: {
    origin: string;
    destination: string;
    risk_score: number;
    created_at: Date;
  };
}

/**
 * Get a user's dashboard statistics
 */
export const getUserDashboardStats = async (userId: string): Promise<DashboardStats> => {
  const [
    avgRiskRes,
    routeCountRes,
    alertCountRes,
    alertFreqRes,
    recentAlertsRes,
    safestRouteRes
  ] = await Promise.all([
    pool.query(
      `SELECT AVG(risk_score)::int AS avg_risk_score FROM routes WHERE user_id = $1`,
      [userId]
    ),
    pool.query(
      `SELECT COUNT(*)::int AS total_routes FROM routes WHERE user_id = $1`,
      [userId]
    ),
    pool.query(
      `SELECT COUNT(*)::int AS total_alerts FROM alerts WHERE user_id = $1`,
      [userId]
    ),
    pool.query(
      `SELECT alert_type, COUNT(*) AS count
       FROM alerts WHERE user_id = $1
       GROUP BY alert_type ORDER BY count DESC LIMIT 1`,
      [userId]
    ),
    pool.query(
      `SELECT message, timestamp, alert_type, severity
       FROM alerts
       WHERE user_id = $1
       ORDER BY timestamp DESC
       LIMIT 3`,
      [userId]
    ),
    pool.query(
      `SELECT origin, destination, risk_score, created_at
       FROM routes
       WHERE user_id = $1 AND risk_score IS NOT NULL
       ORDER BY risk_score ASC
       LIMIT 1`,
      [userId]
    )
  ]);

  return {
    avg_risk_score: avgRiskRes.rows[0]?.avg_risk_score || 0,
    total_routes: routeCountRes.rows[0]?.total_routes || 0,
    total_alerts: alertCountRes.rows[0]?.total_alerts || 0,
    most_common_alert: alertFreqRes.rows[0]?.alert_type || null,
    recent_alerts: recentAlertsRes.rows || [],
    safest_route: safestRouteRes.rows[0] || undefined
  };
};
