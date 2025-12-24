import Resume from '../db/resume.model';
import connectDB from '../config/db';

await connectDB()

const resumeFunctions = {
    async createResume(data: {
        userId: string;
        name: string;
        email: string;
        phone?: string;
        summary?: string;
        linkedin?: string;
        github?: string;
        avatar?: string;
        skills?: string[];
    }) {
        const resume = new Resume(data);
        return await resume.save();
    },
    
    async getAllResumes() {
        return await Resume.find();
    },
    
    async getResume(email: string){
        return await Resume.findOne({ email: email });
    },

    async getResumeById(userId: string) {
        return await Resume.findOne({ userId });
    },
    
    async updateResume(id: string, data: Partial<{
        name: string;
        email: string;
        phone?: string;
        summary?: string;
        linkedin?: string;
        github?: string;
        avatar?: string;
        skills?: string[];
    }>) {
        return await Resume.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteResume(id: string) {
        return await Resume.findByIdAndDelete(id);
    },
}

export default resumeFunctions;