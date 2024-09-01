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
    
});

export const getPlanets = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    const planets = await Planet.find();

    res.status(200).json({
        success: true,
        planets
    })
});


export const getPlanetById = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    const planet = await Planet.findById(req.params.id);

    if (!planet) {
        return next(new ErrorHandler("Planet not found", 404));
    }

    res.status(200).json({
        success: true,
        planet
    })
});


export const updatePlanetInventory = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    
    
    let { inventory } = req.body;
  
    const planet = await Planet.findByIdAndUpdate(req.params.id, {
      inventory: [...inventory]
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: true
    });
  
    if (!planet) {
      return next(new ErrorHandler("Planet not found", 404));
    }
  
    res.status(200).json({
      success: true,
      planet
    })
  
  });



