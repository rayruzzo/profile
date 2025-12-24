import Project from '../db/project.model';

const projectFunctions = {
    async createProject(data: {
        name: string;
        description?: string;
        techStack?: string[];
        gh_link?: string;
        live_link?: string;
        previewImage?: string;
    }) {
        const project = new Project(data);
        return await project.save();
    },

    async getAllProjects() {
        return await Project.find();
    },

    async getProjectById(id: string) {
        return await Project.findById(id);
    },
    
    async updateProject(id: string, data: Partial<{
        name: string;
        description?: string;
        techStack?: string[];
        gh_link?: string;
        live_link?: string;
        previewImage?: string;
    }>) {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteProject(id: string) {
        return await Project.findByIdAndDelete(id);
    },
}

export default projectFunctions;