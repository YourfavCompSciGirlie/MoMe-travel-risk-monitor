import { AlertType, GeoJSONPoint } from "./shared";

// Structure for the 'vulnerabilities' field in the 'vehicles' table
export interface VehicleVulnerabilities {
  hail_sensitive?: boolean;
  low_clearance?: boolean;
  [key: string]: any; // Allows for other future properties
}

// Structure for the 'content' field in the 'alerts' table
export interface AlertContent {
  hazard: string;
  severity: "low" | "moderate" | "high" | "severe";
  advice: string;
}

// Structure for the 'hazards_encountered' field in the 'trips' table
export interface HazardEncountered {
  type: AlertType;
  severity: string;
  location: GeoJSONPoint;
  timestamp: string;
}
