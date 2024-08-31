import express from 'express';

import {
  createPlanet,
  getPlanets,
  getPlanetById,
} from '../controllers/planetController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const planetRouter = express.Router();


// Admin CRUD
planetRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createPlanet);
planetRouter.route('/').get(isUserAuthenticated, getPlanets);
planetRouter.route('/:id').get(isUserAuthenticated, getPlanetById);

export default planetRouter;

