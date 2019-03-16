<<<<<<< HEAD
import * as mongoose from 'mongoose';
=======
import mongoose from 'mongoose';
>>>>>>> 1ff684f084536a90e45957b452e00d3f33095f10

import recipientSchema, { IRecipient } from './Recipient';

export interface ISurvey {
  title: string;
  body: boolean;
  subject: string;
  recipients: [IRecipient] | string;
  yes: number;
  no: number;
  _number: mongoose.Schema.Types.ObjectId;
  dateSent: Date;
  lastResponded: Date;
}

const surveySchema = new mongoose.Schema<ISurvey>({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateSent: Date,
  lastResponded: Date
});

const Survey = mongoose.model('surveys', surveySchema);

export default Survey;
