import { Request, Response } from "express";
import * as routeService from "../services/route.service";

/**
 * POST /api/routes/saved
 * Creates a new saved route for the authenticated user.
 */
export const createSavedRouteController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, start_location, end_location, routePath } = req.body;
    if (!name || !start_location || !end_location) {
      return res.status(400).json({
        error:
          "Missing required fields: name, start_location, and end_location.",
      });
    }

    const savedRoute = await routeService.createSavedRoute({
      userId,
      name,
      startLocation: start_location,
      endLocation: end_location,
      routePath,
    });

    return res.status(201).json(savedRoute);
  } catch (err) {
    console.error("Create saved route error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

/**
 * GET /api/routes/saved
 * Fetches all saved routes for the authenticated user.
 */
export const getSavedRoutesController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const savedRoutes = await routeService.getUserSavedRoutes(userId);
    return res.status(200).json(savedRoutes);
  } catch (err) {
    console.error("Get saved routes error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

/**
 * POST /api/routes/trips
 * Creates a new trip log for the authenticated user.
 */
export const createTripController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { vehicle_id, saved_route_id, planned_route_path } = req.body;
    if (!vehicle_id) {
      return res
        .status(400)
        .json({ error: "Missing required field: vehicle_id." });
    }

    const trip = await routeService.createTrip({
      userId,
      vehicleId: vehicle_id,
      savedRouteId: saved_route_id,
      plannedRoutePath: planned_route_path,
    });

    return res.status(201).json(trip);
  } catch (err) {
    console.error("Create trip error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

/**
 * GET /api/routes/trips
 * Fetches all past trips for the authenticated user.
 */
export const getTripsController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const trips = await routeService.getUserTrips(userId);
    return res.status(200).json(trips);
  } catch (err) {
    console.error("Get trips error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
