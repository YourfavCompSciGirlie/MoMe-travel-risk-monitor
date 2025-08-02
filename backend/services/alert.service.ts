import { supabase } from '../config/db';
import { Alert } from "../types/alert";

// Creates a new alert in the database.
// This now correctly handles the case where trip_id might be null.
export const createAlert = async (
  alertData: Omit<Alert, "id" | "created_at">
): Promise<Alert> => {
  const {
    user_id,
    type,
    content,
    location,
    status = "active",
    trip_id = null, // Default trip_id to null if not provided
  } = alertData;

  // The 'alerts' table is now being inserted into directly,
  // which is simpler and avoids potential RPC signature mismatches.
  const { data, error } = await supabase
    .from("alerts")
    .insert([
      {
        user_id,
        trip_id, // Pass trip_id (can be null)
        type,
        status,
        content,
        location,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating alert:", error);
    throw new Error("Could not create alert in the database.");
  }

  return data;
};

// Fetches all alerts for a given user.
export const getAlertsByUser = async (userId: string): Promise<Alert[]> => {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching alerts:", error);
    throw new Error("Could not fetch alerts.");
  }

  return data || [];
};

// Updates the status of an existing alert.
export const updateAlertStatus = async (
  alertId: string,
  status: "seen" | "dismissed"
): Promise<Alert> => {
  const { data, error } = await supabase
    .from("alerts")
    .update({ status })
    .eq("id", alertId)
    .select()
    .single();

  if (error) {
    console.error("Error updating alert status:", error);
    throw new Error("Could not update alert status.");
  }

  return data;
};
