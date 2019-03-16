import { Schema } from 'mongoose';

export interface IRecipient {
  email: string;
  responded: boolean;
}

const recipientSchema = new Schema<IRecipient>({
  email: String,
  responded: {
    type: Boolean,
    default: false
  }
});

export default recipientSchema;
