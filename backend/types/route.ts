import { GeoJSONPoint, GeoJSONLineString } from "./shared";
import { HazardEncountered } from "./jsonb";

/**
 * Represents a record in the 'saved_routes' table
 */
export interface SavedRoute {
  id: number;
  user_id: number;
  name: string;
  start_location?: GeoJSONPoint;
  end_location?: GeoJSONPoint;
  route_path?: Record<string, any>; // Flexible for polyline or other route data
}

/**
 * Represents a record in the 'trips' table
 */
export interface Trip {
  id: number;
  user_id: number;
  vehicle_id: number;
  saved_route_id?: number | null; // Optional foreign key
  start_time: string; // ISO 8601 date string
  end_time?: string | null; // Optional, set when trip ends
  planned_route_path?: Record<string, any>;
  actual_path_taken?: GeoJSONLineString;
  travel_risk_score?: number;
  hazards_encountered?: HazardEncountered[];
}
