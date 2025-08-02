
import { supabase } from '../config/db';
import { User } from '../types/user';

export const getUserById = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = 'exact one row not found'
    console.error('Error fetching user by ID:', error);
    throw new Error('Could not fetch user profile.');
  }

  return data;
};

export const updateUserPreferences = async (
  userId: string,
  updates: Partial<Pick<User, 
    'language_preference' | 
    'notification_method' | 
    'enable_voice_chat' | 
    'weather_severity_level'
  >>
): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user preferences:', error);
    throw new Error('Could not update user preferences.');
  }

  return data;
};