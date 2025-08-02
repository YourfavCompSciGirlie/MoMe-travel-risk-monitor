import { supabase } from "../config/db";
import { AlertType } from "../types/shared";
import { AlertContent } from "../types/jsonb";

// This interface matches the JSON object returned by our PostgreSQL function.
export interface DashboardStats {
  avg_risk_score: number;
  total_trips: number;
  total_alerts: number;
  most_common_alert_type: AlertType | null;
  recent_alerts: {
    content: AlertContent;
    created_at: string;
    type: AlertType;
  }[];
  safest_trip?: {
    id: number;
    travel_risk_score: number;
    start_time: string;
  };
}

export const getUserDashboardStats = async (
  userId: string
): Promise<DashboardStats> => {
  const { data, error } = await supabase.rpc("get_user_dashboard_stats", {
    p_user_id: userId,
  });

  if (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Could not retrieve dashboard statistics.");
  }

  return data;
};
