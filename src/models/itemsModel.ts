import mongoose from 'mongoose';
import { IItem } from '../interfaces/schemaInterfaces.ts';

const itemSchema = new mongoose.Schema<IItem>({
  
  name: {
    type: String,
    required: [true, 'Please Enter a Name'],
    unique: true,
    min: [2, 'Please provide a longer name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  value: {
    type: Number,
    required: [true, 'Please provide a value'],
  },
});


const Item = mongoose.model('Item', itemSchema);

export default Item;
