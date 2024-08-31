import express from 'express';

import {
  createStation,
} from '../controllers/stationController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const stationRouter = express.Router();



// Admin CRUD
stationRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createStation);

export default stationRouter;

