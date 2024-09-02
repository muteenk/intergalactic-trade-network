import dotenv from 'dotenv';
dotenv.config({path: './config/config.env'});
import http from 'http';
import { Server } from 'socket.io';

import connectDatabase from '../config/database.js';
import app from './app.js';

// Config
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);
connectDatabase();



// Web Socket Connection

io.on('connection', (socket) => {
    console.log('New user connected -> ' + socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    //socket.on('message', msg => {
    //  socket.emit('message', "This is test response "+msg);
    //})
});

io.sockets.on('req', msg => {
  console.log("test");
  io.sockets.emit('message', "This is test response "+msg);
  console.log(msg);
});

const serverHandler = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle Uncaught Exceptions
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: Error) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    serverHandler.close(() => {
        process.exit(1);
    });
})
