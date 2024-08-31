import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Planet from '../models/planetModel.js';


export const createPlanet = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
   
        let {name, inventory, location} = req.body;

        if (!name || name === " " || name === "")
          return next(new ErrorHandler("Please provide a name", 400));

        if (!inventory) inventory = [];

        if (!location)
          return next(new ErrorHandler("Please provide coordinates for the Location", 400));

        const planet = await Planet.create({
          name,
          inventory,
          location
        });
    
        res.status(201).json({
            success: true,
            planet
        })
    
}
