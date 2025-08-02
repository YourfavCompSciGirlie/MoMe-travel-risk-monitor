/**
 * Represents a record in the 'users' table
 */
export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password_hash: string;
  created_at: string; // ISO 8601 date string
  enable_voice_chat: boolean;
  route_tracking_enabled: boolean;
  weather_severity_level: string;
  location_sharing: boolean;
  notification_method: string;
  language_preference: string;
  points: number;
  level: number;
}