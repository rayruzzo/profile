import mongoose, { Schema, Document } from 'mongoose';

const ResumeSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: String },
  summary: { type: String },
  linkedin: { type: String },
  github: { type: String },
  avatar: { type: String },
});

export interface IResume extends Document {
  userId: string;
  name: string;
  tagline?: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
}

export const Resume = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
export default Resume;
