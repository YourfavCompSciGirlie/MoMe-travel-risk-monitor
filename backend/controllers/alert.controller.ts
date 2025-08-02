import { Request, Response } from 'express';
import * as alertService from '../services/alert.service';
import { AlertType, GeoJSONPoint } from "../types/shared";
import { AlertContent } from "../types/jsonb";

export const createAlert = async (req: Request, res: Response) => {
  try {
    // Assuming you have middleware that attaches the user to the request
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const { type, content, location, tripId } = req.body as {
      type: AlertType;
      content: AlertContent;
      location: GeoJSONPoint;
      tripId?: number;
    };

    // Basic validation for required fields
    if (!type || !content || !location) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: type, content, and location are required.",
        });
    }

    // Call the service with a single object argument
    await alertService.createAlert({
      userId,
      tripId,
      type,
      content,
      location,
    });

    return res.status(201).json({ message: "Alert created successfully." });
  } catch (err) {
    console.error("Create alert controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const getUserAlerts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const alerts = await alertService.getUserAlerts(userId);

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

    if (status !== "acknowledged" && status !== "dismissed") {
      return res
        .status(400)
        .json({
          error:
            'Invalid status provided. Must be "acknowledged" or "dismissed".',
        });
    }

    const updatedAlert = await alertService.updateAlertStatus(
      parseInt(alertId, 10),
      status
    );

    return res.status(200).json(updatedAlert);
  } catch (err) {
    console.error("Update alert status controller error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
