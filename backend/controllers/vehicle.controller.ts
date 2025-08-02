import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

export const createVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { brand, model, number_plate, year, vulnerabilities } = req.body;
    if (!brand || !model || !number_plate) {
      return res.status(400).json({
        error: "Missing required fields: brand, model, and number_plate.",
      });
    }

    const newVehicle = await vehicleService.createVehicle({
      user_id: userId,
      brand,
      model,
      number_plate,
      year,
      vulnerabilities,
    });

    return res.status(201).json(newVehicle);
  } catch (err) {
    console.error("Create vehicle error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const getVehiclesController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const vehicles = await vehicleService.getVehiclesByUser(userId);
    return res.status(200).json(vehicles);
  } catch (err) {
    console.error("Get vehicles error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const updateVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { vehicleId } = req.params; // This is a UUID string

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required." });
    }

    // Fetch the specific vehicle to check ownership
    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    // Check if the authenticated user owns this vehicle
    if (vehicle.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not own this vehicle." });
    }

    // Now that ownership is confirmed, update the vehicle
    const updatedVehicle = await vehicleService.updateVehicle(
      vehicleId,
      req.body
    );

    return res.status(200).json(updatedVehicle);
  } catch (err) {
    console.error("Update vehicle error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const deleteVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { vehicleId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required." });
    }

    // First, get the vehicle to check for ownership
    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    // Security Check: Ensure the user owns the vehicle they are trying to delete
    if (vehicle.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not own this vehicle." });
    }

    // If ownership is confirmed, call deleteVehicle with only the vehicleId
    await vehicleService.deleteVehicle(vehicleId);

    // 204 No Content is standard for a successful deletion
    return res.status(204).send();
  } catch (err) {
    console.error("Delete vehicle error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
