// routes/vehicleRoutes.ts

import express from 'express';
import {
  createVehicle,
  getUserVehicles,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// POST /api/vehicles
router.post('/', createVehicle);

// GET /api/vehicles
router.get('/', getUserVehicles);

// PUT /api/vehicles/:vehicleId
router.put('/:vehicleId', updateVehicle);

// DELETE /api/vehicles/:vehicleId
router.delete('/:vehicleId', deleteVehicle);

export default router;
