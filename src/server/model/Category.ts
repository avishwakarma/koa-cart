import * as mongoose from 'mongoose';
import { message } from '../../constant';

const CategorySchema = new mongoose.Schema({
  _id: String,
  parent: String,
  name: {
    type: String,
    required: [true, message.NAME_REQUIRED]
  },
  description: String,
  image: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('category', CategorySchema);