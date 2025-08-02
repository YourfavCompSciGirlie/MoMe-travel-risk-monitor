// controllers/user.controller.ts

import { Request, Response } from 'express';
import * as userService from '../services/user.service';

// GET /api/user/profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/user/preferences
export const updateUserPreferences = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updated = await userService.updateUserPreferences(userId, req.body);

    return res.status(200).json({
      message: 'Preferences updated successfully',
      user: updated,
    });
  } catch (err) {
    console.error('Error updating user preferences:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
