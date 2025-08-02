import { supabase } from "../config/db";
import { Vehicle } from "../types/vehicle";
import { VehicleVulnerabilities } from "../types/jsonb";

export const createVehicle = async (vehicleData: {
  userId: string;
  brand: string;
  model: string;
  number_plate: string;
  year?: number;
  vulnerabilities?: VehicleVulnerabilities;
}): Promise<Vehicle> => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      user_id: vehicleData.userId,
      brand: vehicleData.brand,
      model: vehicleData.model,
      number_plate: vehicleData.number_plate,
      year: vehicleData.year,
      vulnerabilities: vehicleData.vulnerabilities,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Could not create vehicle.");
  }

  return data;
};

export const getVehiclesByUser = async (userId: string): Promise<Vehicle[]> => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Could not fetch vehicles.");
  }

  return data;
};

export const updateVehicle = async (
  vehicleId: number,
  updates: Partial<Omit<Vehicle, "id" | "user_id" | "created_at">>
): Promise<Vehicle> => {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", vehicleId)
    .select()
    .single();

  if (error) {
    console.error("Error updating vehicle:", error);
    throw new Error("Could not update vehicle.");
  }

  return data;
};

export const deleteVehicle = async (
  vehicleId: number,
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from("vehicles")
    .delete()
    .match({ id: vehicleId, user_id: userId }); // Ensures users can only delete their own vehicles

  if (error) {
    console.error("Error deleting vehicle:", error);
    throw new Error("Could not delete vehicle.");
  }
};
