import express from 'express';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
    res.send('Intergalactic Trade Network API');
});

export default baseRouter;
