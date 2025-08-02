// routes/vehicleRoutes.ts

import express from 'express';
import {
  createVehicleController,
  getVehiclesController,
  updateVehicleController,
  deleteVehicleController,
} from "../controllers/vehicle.controller";

import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// POST /api/vehicles
router.post("/", createVehicleController);

// GET /api/vehicles
router.get("/", getVehiclesController);

// PUT /api/vehicles/:vehicleId
router.put("/:vehicleId", updateVehicleController);

// DELETE /api/vehicles/:vehicleId
router.delete("/:vehicleId", deleteVehicleController);

export default router;
