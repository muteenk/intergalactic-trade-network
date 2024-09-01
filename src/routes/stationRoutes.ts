import express from 'express';

import {
  createStation,
  getStations,
  getStationById,
  updateStationInventory,
} from '../controllers/stationController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const stationRouter = express.Router();



// Admin CRUD
stationRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createStation);

// General CRUD
stationRouter.route('/').get(isUserAuthenticated, getStations);
stationRouter.route('/:id').get(isUserAuthenticated, getStationById);

// Vendor CRUD
stationRouter.route('/inventory/add/:id').put(isUserAuthenticated, authorizeRoles('admin', 'vendor'), updateStationInventory);

export default stationRouter;

