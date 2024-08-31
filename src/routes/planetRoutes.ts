import express from 'express';

import {
  createPlanet,
} from '../controllers/planetController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const planetRouter = express.Router();



// Admin CRUD
planetRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createPlanet);

export default planetRouter;

