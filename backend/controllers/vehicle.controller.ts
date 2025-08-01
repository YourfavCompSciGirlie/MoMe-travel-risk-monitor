// controllers/vehicle.controller.ts

import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

// POST /api/vehicles
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const {
      make, model, number_plate, year,
      type, nickname,
      hail_sensitive, wind_sensitive
    } = req.body;

    const vehicle = await vehicleService.createVehicle(
      userId, make, model, number_plate, year,
      type, nickname, hail_sensitive, wind_sensitive
    );

    return res.status(201).json({ message: 'Vehicle created', vehicle });
  } catch (err) {
    console.error('Create vehicle error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/vehicles
export const getUserVehicles = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const vehicles = await vehicleService.getVehiclesByUser(userId);

    return res.status(200).json(vehicles);
  } catch (err) {
    console.error('Get vehicles error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/vehicles/:vehicleId
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const updates = req.body;

    const updated = await vehicleService.updateVehicle(vehicleId, updates);

    if (!updated) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    return res.status(200).json({ message: 'Vehicle updated', vehicle: updated });
  } catch (err) {
    console.error('Update vehicle error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/vehicles/:vehicleId
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;

    const deleted = await vehicleService.deleteVehicle(vehicleId);

    if (!deleted) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    return res.status(200).json({ message: 'Vehicle deleted' });
  } catch (err) {
    console.error('Delete vehicle error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
