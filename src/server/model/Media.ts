import * as mongoose from 'mongoose';
import { message } from '../../constant';

const MediaScehma = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: [true, message.NAME_REQUIRED]
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video']
  },
  src: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

export default mongoose.model('media', MediaScehma);