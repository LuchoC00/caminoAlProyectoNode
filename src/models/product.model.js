import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: Array,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
  _id: {
    type: Number,
    required: true,
  },
});

const productModel = model('product', productSchema);

export { productModel };
