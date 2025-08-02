// routes/routeRoutes.ts

import express from 'express';
import {
  createRoute,
  getUserRoutes,
  getRouteById
} from '../controllers/route.controller';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// POST /api/routes
router.post('/', createRoute);

// GET /api/routes
router.get('/', getUserRoutes);

// GET /api/routes/:routeId
router.get('/:routeId', getRouteById);

export default router;
