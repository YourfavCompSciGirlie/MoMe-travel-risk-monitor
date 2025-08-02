/**
 * Represents a record in the 'achievements' table
 */
export interface Achievement {
  id: number;
  name: string;
  description?: string;
  icon_url?: string;
}

/**
 * Represents a record in the 'user_achievements' join table
 */
export interface UserAchievement {
  user_id: number;
  achievement_id: number;
  earned_at: string; // ISO 8601 date string
}
