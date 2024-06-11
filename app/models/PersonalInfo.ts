import mongoose, { Schema, Document } from 'mongoose';

export interface IPersonalInfo extends Document {
  userId: mongoose.Types.ObjectId;
  planName: string;
  dateOfBirth: Date;
  height: number;
  weight: number;
  weeklyActivities: string[];
}

const personalInfoSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Model that used to ref
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  weeklyActivities: {
    type: [String],
    required: true,
  },
});

const PersonalInfo =
  mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>('PersonalInfo', personalInfoSchema);

export default PersonalInfo;
