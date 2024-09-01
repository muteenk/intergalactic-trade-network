import express from 'express';

import {
  createPlanet,
  getPlanets,
  getPlanetById,
  updatePlanetInventory,
} from '../controllers/planetController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const planetRouter = express.Router();


// Admin CRUD
planetRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createPlanet);

// General CRUD
planetRouter.route('/').get(getPlanets);
planetRouter.route('/:id').get(getPlanetById);

// Vendor CRUD
planetRouter.route('/inventory/add/:id').put(isUserAuthenticated, authorizeRoles('admin', 'vendor'), updatePlanetInventory);

export default planetRouter;

