import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  techStack?: string[];
  gh_link?: string;
  live_link?: string;
  previewImage?: string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  techStack: { type: [String] },
  gh_link: { type: String },
  live_link: { type: String },
  previewImage: { type: String },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
