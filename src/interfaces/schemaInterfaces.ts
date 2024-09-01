import { Schema, Document } from 'mongoose';


// Interface for User Schema
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'vendor';
    location: Schema.Types.ObjectId;
    locationType: 'spacestation' | 'planet';
    resetPasswordToken: string | undefined;
    resetPasswordExpire: Date | undefined;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    getJWTToken: () => string;
    resetPasswordTokenGenerator: () => string;
}


// Interface for Space Station Schema
export interface ISpaceStation extends Document {
  name: string;
  planet: Schema.Types.ObjectId;
  inventory: Array<{
    item: Schema.Types.ObjectId;
    name: string;
    quantity: number;
  }>;
  location: {
    x: number;
    y: number;
    z: number;
  };
}


// interface for Planet Schema
export interface IPlanet extends Document {
  name: string;
  inventory: Array<{
    item: Schema.Types.ObjectId;
    name: string;
    quantity: number;
  }>;
  location: {
    x: number;
    y: number;
    z: number;
  };
}


// Interface for Item Schema
export interface IItem extends Document {
  name: string;
  description: string;
  value: number;
}


// Interface for Transaction Schema
export interface ITransaction extends Document {
  trade: Schema.Types.ObjectId;
  currentLocation: Schema.Types.ObjectId;
  currentLocationType: 'spacestation' | 'planet';
  destination: Schema.Types.ObjectId;
  destinationType: 'spacestation' | 'planet';
  status: 'pending' | 'in-transit' | 'completed' | 'cancelled';
  estimatedDelivery: Date;
}


// Interface for Trade Schema
export interface ITrade extends Document {
  sender: Schema.Types.ObjectId;
  senderType: 'spacestation' | 'planet';
  senderItem: {
    item: Schema.Types.ObjectId;
    quantity: number;
  };
  receiver: Schema.Types.ObjectId;
  receiverType: 'spacestation' | 'planet';
  receiverItem: {
    item: Schema.Types.ObjectId;
    quantity: number;
  };
  createdAt: Date;
}



