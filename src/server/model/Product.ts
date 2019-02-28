import * as mongoose from 'mongoose';
import { message } from '../../constant';

const ProductSchema = new mongoose.Schema({
  _id: String,
  category: String,
  sku: {
    type: String,
    unique: true,
    required: [true, message.SKU_REQUIRED]
  },
  name: {
    type: String,
    required: [true, message.NAME_REQUIRED]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    currencry: String,
    value: mongoose.Types.Decimal128
  }
});

export default mongoose.model('product', ProductSchema);