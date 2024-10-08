import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import errorMiddleware from './middleware/error.js';

// Route Imports
import baseRouter from './routes/baseRoutes.js';
import userRouter from './routes/userRoutes.js';
import planetRouter from './routes/planetRoutes.js';
import stationRouter from './routes/stationRoutes.js';
import itemRouter from './routes/itemRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';

// Init
const app: express.Application = express();
const corsOptions = {
    origin: "*",
    credentials: true,
}


// Middlewares
/*-- General --*/
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions));
/*-- Personal --*/
app.use(errorMiddleware);


// Routes
app.use('/api/', baseRouter);
app.use('/api/users', userRouter);
app.use('/api/planets', planetRouter);
app.use('/api/stations', stationRouter);
app.use('/api/items', itemRouter);
app.use('/api/transactions', transactionRouter);

export default app;
