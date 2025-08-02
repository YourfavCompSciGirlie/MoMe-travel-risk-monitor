import { Request, Response } from 'express';
import * as alertService from '../services/alert.service';
import { User } from "@supabase/supabase-js";

// Extend the Express Request type to include the 'user' property from Supabase
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export const createAlert = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const { type, content, location, trip_id, status } = req.body;

    // Basic validation for required fields
    if (!type || !content || !location) {
      return res.status(400).json({
        error:
          "Missing required fields: type, content, and location are required.",
      });
    }

    // Call the service with all required properties, providing a default for status
    const newAlert = await alertService.createAlert({
      user_id: userId,
      trip_id,
      type,
      content,
      location,
      status: status || "active", // Add the status property here
    });

    return res.status(201).json(newAlert);
  } catch (err) {
    console.error("Create alert controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const getUserAlerts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const alerts = await alertService.getAlertsByUser(userId);

    return res.status(200).json(alerts);
  } catch (err) {
    console.error("Get user alerts controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const updateAlertStatus = async (req: Request, res: Response) => {
  try {
    const { alertId } = req.params;
    const { status } = req.body;

    if (!alertId) {
      return res.status(400).json({ error: "Alert ID is required." });
    }

    if (status !== "seen" && status !== "dismissed") {
      return res.status(400).json({
        error: 'Invalid status provided. Must be "seen" or "dismissed".',
      });
    }

    const updatedAlert = await alertService.updateAlertStatus(alertId, status);

    return res.status(200).json(updatedAlert);
  } catch (err) {
    console.error("Update alert status controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
