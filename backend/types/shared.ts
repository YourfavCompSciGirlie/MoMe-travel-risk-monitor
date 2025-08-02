// Corresponds to the 'alert_type' ENUM in PostgreSQL
export type AlertType = "weather" | "crime" | "traffic";

// Corresponds to the 'alert_status' ENUM in PostgreSQL
export type AlertStatus = "sent" | "acknowledged" | "dismissed";

// Basic GeoJSON types for PostGIS GEOGRAPHY fields
export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface GeoJSONLineString {
  type: "LineString";
  coordinates: Array<[number, number]>;
}
