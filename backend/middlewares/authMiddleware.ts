// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { supabase } from "../config/db";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Use Supabase's built-in method to verify the token and get the user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Supabase auth error:", error.message);
      // Provide a more specific error based on Supabase's response
      return res
        .status(401)
        .json({ message: error.message || "Invalid token" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found for this token" });
    }

    // Attach the authenticated user object to the request for use in controllers
    req.user = user;

    next();
  } catch (error: any) {
    console.error("Auth middleware catch block error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default authMiddleware;