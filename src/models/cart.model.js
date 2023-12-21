import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: {
    type: Array,
    default: [],
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

const cartModel = model('cart', cartSchema);

export { cartModel };
