
import mongoose, { Schema, Document } from 'mongoose';
import type { Education } from "@/types/education";

export interface IEducation extends Education, Document {}

const EducationSchema: Schema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: String, required: true }, // MM/YYYY
  endDate: { type: String }, // MM/YYYY
  description: { type: String },
});

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
