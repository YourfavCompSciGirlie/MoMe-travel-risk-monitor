import { AlertContent } from "./jsonb";
import { AlertStatus, AlertType, GeoJSONPoint } from "./shared";

/**
 * Represents a record in the 'alerts' table
 */
export interface Alert {
  id: string;
  user_id: string;
  trip_id?: string | null;
  type: AlertType;
  status: AlertStatus;
  content?: AlertContent;
  location?: GeoJSONPoint;
  created_at: string; // ISO 8601 date string
}
