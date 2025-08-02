// services/user.service.ts

import pool from '../config/db'; // Postgres connection
import { User } from '../types/user';

/**
 * Get a user by ID (public profile)
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT id, email, phone_number, name, surname, created_at
     FROM users WHERE id = $1`,
    [userId]
  );

  return result.rows[0] || null;
};

/**
 * Update basic user settings like language, voice mode, etc.
 */
export const updateUserPreferences = async (
  userId: string,
  updates: {
    language_preference?: string;
    notification_method?: string;
    enable_voice_mode?: boolean;
    weather_severity_level?: number;
  }
): Promise<User | null> => {
  const {
    language_preference,
    notification_method,
    enable_voice_mode,
    weather_severity_level,
  } = updates;

  const result = await pool.query(
    `UPDATE users
     SET
       language_preference = COALESCE($1, language_preference),
       notification_method = COALESCE($2, notification_method),
       enable_voice_mode = COALESCE($3, enable_voice_mode),
       weather_severity_level = COALESCE($4, weather_severity_level)
     WHERE id = $5
     RETURNING id, email, phone_number, name, surname, created_at`,
    [language_preference, notification_method, enable_voice_mode, weather_severity_level, userId]
  );

  return result.rows[0] || null;
};
