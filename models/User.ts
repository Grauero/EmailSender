import * as mongoose from 'mongoose';

export interface IUser {
  googleId: string;
  credits: number;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('users', userSchema);

export default User;
