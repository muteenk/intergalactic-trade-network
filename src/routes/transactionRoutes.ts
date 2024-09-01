import express from 'express';
import {
  createTransaction,
} from '../controllers/transactionController.js';

import { isUserAuthenticated, authorizeRoles } from "../middleware/auth.js";

const transactionRouter = express.Router();

transactionRouter.route('/new').post(isUserAuthenticated, createTransaction);

export default transactionRouter;
