import { supabase } from "../config/db";
import { Vehicle } from "../types/vehicle";

// Creates a new vehicle record for a specific user.
export const createVehicle = async (
  vehicleData: Omit<Vehicle, "id" | "created_at">
): Promise<Vehicle> => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([vehicleData])
    .select()
    .single();

  if (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Could not create vehicle.");
  }
  return data;
};

// Fetches all vehicles owned by a specific user.
export const getVehiclesByUser = async (userId: string): Promise<Vehicle[]> => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Could not fetch vehicles.");
  }
  return data || [];
};

// Fetches a single vehicle by its unique ID.
export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  // PGRST116 means no rows were found, which is not an error in this case.
  if (error && error.code !== "PGRST116") {
    console.error("Error fetching vehicle by ID:", error);
    throw new Error("Could not fetch vehicle.");
  }

  return data;
};

// Updates an existing vehicle's details.
export const updateVehicle = async (
  id: string,
  updates: Partial<Vehicle>
): Promise<Vehicle> => {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating vehicle:", error);
    throw new Error("Could not update vehicle.");
  }
  return data;
};

// Deletes a vehicle from the database.
export const deleteVehicle = async (
  id: string
): Promise<{ message: string }> => {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting vehicle:", error);
    throw new Error("Could not delete vehicle.");
  }
  return { message: "Vehicle deleted successfully" };
};
