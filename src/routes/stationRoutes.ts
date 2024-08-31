import express from 'express';

import {
  createStation,
  getStations,
  getStationById,
} from '../controllers/stationController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const stationRouter = express.Router();



// Admin CRUD
stationRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createStation);
stationRouter.route('/').get(isUserAuthenticated, getStations);
stationRouter.route('/:id').get(isUserAuthenticated, getStationById);


export default stationRouter;

