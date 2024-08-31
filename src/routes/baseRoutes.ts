import express from 'express';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
    res.status(200).send('Welcome to the Intergalactic Trade Network API');
});

export default baseRouter;
