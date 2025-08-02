import { supabase } from "./config/db";

// Define a type for your data for type safety
interface User {
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

async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .returns<User[]>();

    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }

    console.log("Fetched users:", data);
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
}

// Run the function
getUsers();
