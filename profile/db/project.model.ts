
import mongoose, { Schema, Document } from 'mongoose';
import type { Project } from "@/types/project";

export interface IProject extends Project, Document {}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  techStack: { type: [String] },
  gh_link: { type: String },
  live_link: { type: String },
  previewImage: { type: String },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
