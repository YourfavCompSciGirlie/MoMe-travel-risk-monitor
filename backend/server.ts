import { supabase } from "./config/db";
import { User } from "./types/user";

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
