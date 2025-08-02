import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

export const createVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { brand, model, number_plate, year, vulnerabilities } = req.body;
    if (!brand || !model || !number_plate) {
      return res.status(400).json({ error: 'Missing required fields: brand, model, and number_plate.' });
    }

    const newVehicle = await vehicleService.createVehicle({
      userId,
      brand,
      model,
      number_plate,
      year,
      vulnerabilities,
    });

    return res.status(201).json(newVehicle);
  } catch (err) {
    console.error('Create vehicle error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

export const getVehiclesController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const vehicles = await vehicleService.getVehiclesByUser(userId);
    return res.status(200).json(vehicles);
  } catch (err) {
    console.error('Get vehicles error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

export const updateVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { vehicleId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!vehicleId) {
      return res.status(400).json({ error: 'Vehicle ID is required.' });
    }

    // Ensure users can only update their own vehicles (service logic could also enforce this)
    const vehicles = await vehicleService.getVehiclesByUser(userId);
    if (!vehicles.some(v => v.id === parseInt(vehicleId, 10))) {
        return res.status(403).json({ error: 'Forbidden: You do not own this vehicle.' });
    }

    const updatedVehicle = await vehicleService.updateVehicle(parseInt(vehicleId, 10), req.body);
    return res.status(200).json(updatedVehicle);
  } catch (err) {
    console.error('Update vehicle error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

export const deleteVehicleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { vehicleId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!vehicleId) {
      return res.status(400).json({ error: 'Vehicle ID is required.' });
    }

    await vehicleService.deleteVehicle(parseInt(vehicleId, 10), userId);
    return res.status(204).send(); // 204 No Content is standard for successful deletion
  } catch (err) {
    console.error('Delete vehicle error:', err);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};