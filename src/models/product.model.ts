import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true
  }
});

export default model('product', ProductSchema);
