import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  employer: string;
  title: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

const JobSchema: Schema = new Schema({
  employer: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
