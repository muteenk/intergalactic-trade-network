import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Item from '../models/itemsModel.js';
import Planet from '../models/planetModel.js';
import Station from '../models/spaceStationModel.js';


export const createItem = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
   
        let {name, description, value} = req.body;

        if (!name || name === " " || name === "")
          return next(new ErrorHandler("Please provide a name", 400));

        if (!value)
          return next(new ErrorHandler("Please provide a value", 400));

        const item = await Item.create({
          name,
          description,
          value
        });
    
        res.status(201).json({
            success: true,
            item
        })
    
});


export const searchByName = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

    // Search Item in Planet Inventory
    const planets = await Planet.find({ "inventory.name": req.params.name });

    const stations = await Station.find({ "inventory.name": req.params.name });

    if (planets.length <= 0 && stations.length <= 0) {
        return next(new ErrorHandler("Item not found", 404));
    }

    res.status(200).json({
        success: true,
        planets,
        stations
    })

});



export const searchById = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

  const planets = await Planet.find({ "inventory.item": req.params.id });
  const stations = await Station.find({ "inventory.item": req.params.id });

  if (planets.length <= 0 && stations.length <= 0) {
    return next(new ErrorHandler("Item not found", 403));
  }

  res.status(200).json({
    success: true,
    planets,
    stations
  })

});



type InventoryItems = {
  item: string;
  name: string;
  quantity: number;
}
