import express from 'express';

import {
  createItem,
  searchByName,
  searchById
} from '../controllers/itemController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const itemRouter = express.Router();


// Admin CRUD
itemRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createItem);
itemRouter.route('/search/:name').get(isUserAuthenticated, searchByName);
itemRouter.route('/search/:id').get(isUserAuthenticated, searchById);

export default itemRouter;

