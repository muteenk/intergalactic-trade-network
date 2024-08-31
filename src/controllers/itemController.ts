import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Item from '../models/itemsModel.js';


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
    
})
