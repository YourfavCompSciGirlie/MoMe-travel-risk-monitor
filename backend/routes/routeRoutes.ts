import { Router } from "express";
import {
  createSavedRouteController,
  getSavedRoutesController,
  createTripController,
  getTripsController,
} from "../controllers/route.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// All routes in this file require user authentication.
router.use(authMiddleware);

// Routes for handling "Saved Routes" (user favorites)
router
  .route("/saved")
  .post(createSavedRouteController) // POST /api/routes/saved
  .get(getSavedRoutesController); // GET /api/routes/saved

// Routes for handling actual "Trips" (historical journey logs)
router
  .route("/trips")
  .post(createTripController) // POST /api/routes/trips
  .get(getTripsController); // GET /api/routes/trips

export default router;
