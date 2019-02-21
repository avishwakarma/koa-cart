import * as mongoose from 'mongoose';
import { validateEmail } from '../utility/helper';
import { message } from '../../constant';

const UserSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: [true, message.NAME_REQUIRED]
  },
  email: {
    type: String,
    required: [true, message.EMAIL_REQUIRED],
    unique: true,
    validate: {
      validator: validateEmail,
      message: (props: any) => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    minlength: 6
  },
  avatar: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  birthday: Date,
  phone: Number,
  area: String,
  locality: String,
  city: String,
  state: String,
  country: String,
  pincode: Number
});

export default mongoose.model('user', UserSchema);