import { AlertContent } from "./jsonb";
import { AlertStatus, AlertType, GeoJSONPoint } from "./shared";

/**
 * Represents a record in the 'alerts' table
 */
export interface Alert {
  id: number;
  user_id: number;
  trip_id?: number | null;
  type: AlertType;
  status: AlertStatus;
  content?: AlertContent;
  location?: GeoJSONPoint;
  created_at: string; // ISO 8601 date string
}
