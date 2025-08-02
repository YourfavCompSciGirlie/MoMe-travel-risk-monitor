// controllers/auth.controller.ts

import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, phone_number, name, surname } = req.body;

    // Basic validation
    if (!email || !password || !phone_number || !name || !surname) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await authService.registerUser(email, password, phone_number, name, surname);

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err: any) {
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { token, user } = await authService.loginUser(email, password);

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(401).json({ error: 'Invalid email or password' });
  }
};

// GET /api/auth/me (protected)
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
