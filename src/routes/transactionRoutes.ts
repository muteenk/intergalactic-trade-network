import express from 'express';
import {
  createTransaction,
  trackTransactionsById,
  getAllTransactions,
  updateTransaction,
} from '../controllers/transactionController.js';

import { isUserAuthenticated, authorizeRoles } from "../middleware/auth.js";

const transactionRouter = express.Router();

// User CRUD
transactionRouter.route('/new').post(isUserAuthenticated, createTransaction);
transactionRouter.route('/track/all').get(isUserAuthenticated, getAllTransactions);

// General CRUD
transactionRouter.route('/track/:id').get(trackTransactionsById);

// Vendor CRUD
transactionRouter.route('/update/:id').put(isUserAuthenticated, authorizeRoles('admin', 'vendor'), updateTransaction);

export default transactionRouter;
