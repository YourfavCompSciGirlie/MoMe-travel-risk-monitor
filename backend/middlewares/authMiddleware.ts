// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

interface JwtPayload {
  id: string;
  email: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Attach user info to request (extend Request type if needed)
    (req as any).user = decoded;

    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

export default authMiddleware;
