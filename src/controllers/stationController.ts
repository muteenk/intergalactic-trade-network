import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Station from '../models/spaceStationModel.js';


export const createStation = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
   
        let {name, inventory, location} = req.body;

        if (!name || name === " " || name === "")
          return next(new ErrorHandler("Please provide a name", 400));

        if (!inventory) inventory = [];

        if (!location)
          return next(new ErrorHandler("Please provide coordinates for the Location", 400));

        const station = await Station.create({
          name,
          inventory,
          location
        });
    
        res.status(201).json({
            success: true,
            station
        })
    
});


export const getStations = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    const stations = await Station.find();

    res.status(200).json({
        success: true,
        stations
    })
});


export const getStationById = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    const station = await Station.findById(req.params.id);

    if (!station) {
        return next(new ErrorHandler("Station not found", 404));
    }

    res.status(200).json({
        success: true,
        station
    })
});
