import Project from '../db/project.model';
import connectDB from '../config/db';
import type { Project as ProjectType } from "@/types/project";

await connectDB()

const projectFunctions = {
    async createProject(data: ProjectType) {
        const project = new Project(data);
        return await project.save();
    },

    async getAllProjects() {
        return await Project.find();
    },

    async getProjectById(id: string) {
        return await Project.findById(id);
    },

    async updateProject(id: string, data: Partial<ProjectType>) {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteProject(id: string) {
        return await Project.findByIdAndDelete(id);
    },
}

export default projectFunctions;