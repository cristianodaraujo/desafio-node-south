import ProductInterface from '@interfaces/product.interface';
import { Schema, model } from 'mongoose';

const ProductModel = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true
  },
  quantity: {
    type: Schema.Types.Number,
    required: true
  }
});

export default model<ProductInterface>('product', ProductModel);
