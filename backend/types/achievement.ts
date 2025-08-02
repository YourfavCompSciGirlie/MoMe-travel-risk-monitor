/**
 * Represents a record in the 'achievements' table
 */
export interface Achievement {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
}

/**
 * Represents a record in the 'user_achievements' join table
 */
export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  earned_at: string; // ISO 8601 date string
}
