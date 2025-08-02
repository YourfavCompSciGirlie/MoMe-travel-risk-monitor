
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Omit sensitive data if necessary before sending
    const { ...publicProfile } = user;

    return res.status(200).json(publicProfile);
  } catch (err) {
    console.error('Get user profile error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

export const updateCurrentUserPreferences = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const {
      language_preference,
      notification_method,
      enable_voice_chat,
      weather_severity_level,
    } = req.body;

    const updates = {
      language_preference,
      notification_method,
      enable_voice_chat,
      weather_severity_level,
    };

    // Filter out any undefined values so we only update what's provided
    const validUpdates = Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined));

    if (Object.keys(validUpdates).length === 0) {
        return res.status(400).json({ error: 'No valid preferences provided to update.' });
    }

    const updatedUser = await userService.updateUserPreferences(userId, validUpdates);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Update user preferences error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};
