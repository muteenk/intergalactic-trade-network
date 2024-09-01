import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Transaction from "../models/transactionModel.js";
import Trade from "../models/tradeModel.js";
import Planet from "../models/planetModel.js";
import Station from "../models/spaceStationModel.js";
import Item from "../models/itemsModel.js";


// Create new Transaction

export const createTransaction = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {

    const planetSession = await Planet.startSession();
    const stationSession = await Station.startSession();
    planetSession.startTransaction();
    stationSession.startTransaction();

    try {
      const user = req.user;
      const {sender, senderType, senderItem, receiverItem, estimatedDelivery} = req.body;
      
      // Data Validation
      if ( !sender) 
        return next(new ErrorHandler("Please provide a sender", 400));
 
      if (!senderType || (senderType !== "planet" && senderType !== "spacestation"))
        return next(new ErrorHandler("Invalid sender type", 400));  

      if (!senderItem || !senderItem.item || !senderItem.quantity || senderItem.quantity <= 0)
        return next(new ErrorHandler("Please provide appropriate sender item", 400));

      if (!receiverItem || !receiverItem.item || !receiverItem.quantity || receiverItem.quantity <= 0)
        return next(new ErrorHandler("Please provide appropriate receiver item", 400));

      if (!estimatedDelivery || isNaN(Date.parse(estimatedDelivery)))
        return next(new ErrorHandler("Please provide a valid estimated delivery date", 400));

      
      let senderInfo;
      if (senderType === "planet") {
        senderInfo = await Planet.findById(sender);
        if (!senderInfo)
          return next(new ErrorHandler("Invalid sender", 400));
        
        let flag = 0;
        senderInfo.inventory.forEach((item) => {
          let senderID = item.item.toString();
          if (senderID === senderItem.item) {
            flag = 1;
            if (item.quantity - senderItem.quantity < 0)
              return next(new ErrorHandler("Insufficient quantity of sender item", 400));
            item.quantity -= senderItem.quantity;
          }  
        });

        if (flag === 0)
          return next(new ErrorHandler("Sender doesn't have this item", 400));

      }
      else {
        senderInfo = await Station.findById(sender);
        if (!senderInfo)
          return next(new ErrorHandler("Invalid sender", 400));

        let flag = 0;
        senderInfo.inventory.forEach((item) => {
          let senderID = item.item.toString();
          if (senderID === senderItem.item) {
            flag = 1;
            if (item.quantity - senderItem.quantity < 0)
              return next(new ErrorHandler("Insufficient quantity of sender item", 400));
            item.quantity -= senderItem.quantity;
          }
        });

        if (flag === 0)
          return next(new ErrorHandler("Sender doesn't have this item", 400));

      }


      let receiverInfo;
      if (user.locationType === "planet"){
        receiverInfo = await Planet.findById(user.location);
        if (!receiverInfo)
          return next(new ErrorHandler("Invalid receiver", 500));

        let flag = 0;
        receiverInfo.inventory.forEach((item) => {
          let receiverID = item.item.toString();
          if (receiverID === senderItem.item) {
            flag = 1;
            item.quantity += senderItem.quantity;
          }
        });

        if (flag === 0){
          const ri = await Item.findById(senderItem.item);
          if (!ri)
            return next(new ErrorHandler("Invalid sender item", 500));
          senderItem.name = ri.name;
          receiverInfo.inventory.push(senderItem);
        }
                   
      }
      else{
       
        receiverInfo = await Station.findById(user.location.toString());
        
        if (!receiverInfo)
          return next(new ErrorHandler("Invalid receiver", 500));

        let flag = 0;
        receiverInfo.inventory.forEach((item) => {
          let receiverID = item.item.toString();
          if (receiverID === senderItem.item) {
            flag = 1;
            item.quantity += senderItem.quantity;
          }
        });

        if (flag === 0){
          const ri = await Item.findById(senderItem.item);
          if (!ri)
            return next(new ErrorHandler("Invalid sender item", 500));
          senderItem.name = ri.name;
          receiverInfo.inventory.push(senderItem);
        }

      }

      let flag2 = 0;
      receiverInfo.inventory.forEach((item) => {
        let receiverID = item.item.toString();
        if (receiverID === receiverItem.item) {
          flag2 = 1;
          if (item.quantity - receiverItem.quantity <= 0)
            return next(new ErrorHandler("Insufficient receiver item quantity", 400));
          item.quantity -= receiverItem.quantity;
        }
      });

      if (flag2 === 0)
        return next(new ErrorHandler("Receiver doesn't have this item", 400));

      flag2 = 0;
      senderInfo.inventory.forEach((item) => {
        let senderID = item.item.toString();
        if (senderID === receiverItem.item) {
          flag2 = 1;
          item.quantity += receiverItem.quantity;
        }
      });

      if (flag2 === 0){
        const ri = await Item.findById(receiverItem.item);
        if (!ri)
          return next(new ErrorHandler("Invalid receiver item", 500));
        receiverItem.name = ri.name;
        senderInfo.inventory.push(receiverItem);
      }
        
      

      const trade = await Trade.create({
        sender,
        senderType,
        senderItem,
        receiver: user.location,
        receiverType: user.locationType,
        receiverItem,
      });

      const transaction = await Transaction.create({
        trade: trade._id,
        currentLocation: trade.sender,
        currentLocationType: trade.senderType,
        destination: user.location,
        destinationType: user.locationType,
        status: "pending",
        estimatedDelivery,
      });
  
      await receiverInfo.save();
      await senderInfo.save();

      await planetSession.commitTransaction();
      await stationSession.commitTransaction();
      planetSession.endSession();
      stationSession.endSession();

      res.status(201).json({
        success: true,
        trade,
        transaction,
      });



  } catch (error: any) {
    await planetSession.abortTransaction();
    await stationSession.abortTransaction();
    planetSession.endSession();
    stationSession.endSession();
    return next(new ErrorHandler(error.message, 500));
  }


});






// Get Single Transaction
export const trackTransactionsById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction)
    return next(new ErrorHandler("No Records Found", 404));
  res.status(200).json({
    success: true,
    transaction,
  });
});




// Get All Transactions
export const getAllTransactions = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  const transactions = await Transaction.find({destination: user.location});
  res.status(200).json({
    success: true,
    transactions,
  });
});



