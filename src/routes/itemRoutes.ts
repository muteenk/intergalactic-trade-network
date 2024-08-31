import express from 'express';

import {
  createItem,
} from '../controllers/itemController.js';

import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const itemRouter = express.Router();



// Admin CRUD
itemRouter.route('/admin/create').post(isUserAuthenticated, authorizeRoles('admin'), createItem);

export default itemRouter;

