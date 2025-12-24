
import mongoose, { Schema, Document } from 'mongoose';
import type { Job } from "@/types/job";

export interface IJob extends Job, Document {}

const JobSchema: Schema = new Schema({
  employer: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true }, // MM/YYYY
  endDate: { type: String }, // MM/YYYY
  description: [{ type: String }],
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
