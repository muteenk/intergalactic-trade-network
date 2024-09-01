import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Station from '../models/spaceStationModel.js';
import Item from '../models/itemsModel.js';


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


export const updateStationInventory = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
   
    // item_id is for the item to be added to the inventory
    let { item_id, quantity } = req.body;

    if (!item_id || !quantity) {
      return next(new ErrorHandler("Please provide an item id and quantity", 400));
    }

    // Can't Decrement Inventory items yet
    if (quantity <= 0) {
      return next(new ErrorHandler("Quantity must be greater than 0", 400));
    }


    // Check if item exists
    const item = await Item.findById(item_id);
    if (!item) {
      return next(new ErrorHandler("Item not found", 404));
    }

    
    // If item in not already in the inventory, add it
    const station = await Station.findOneAndUpdate(
      { _id: req.params.id, "inventory.item": { $ne: item_id } },
      { 
        $addToSet: { 
          inventory: {
            item: item_id,
            name: item.name,
            quantity
          }
        }
      },
      { new: true }
    );

    if (station) {
      res.status(200).json({
      success: true,
      station
     })
    }
  

    // If item is already in the inventory, update it
    const updatedStation = await Station.findOneAndUpdate(
      { _id: req.params.id, "inventory.item": item_id },
      { 
        $inc: { "inventory.$.quantity": quantity }
      },
      { new: true }
    );


    if (!updatedStation) {
      return next(new ErrorHandler("Space Station not found", 404));
    }
  
    res.status(200).json({
      success: true,
      station: updatedStation
    })
  
  });






