import { VehicleVulnerabilities } from "./jsonb";

/**
 * Represents a record in the 'vehicles' table
 */
export interface Vehicle {
  id: number;
  user_id: number;
  brand: string;
  model: string;
  number_plate: string;
  year?: number; // Optional field
  vulnerabilities?: VehicleVulnerabilities; // Optional JSONB field
}
