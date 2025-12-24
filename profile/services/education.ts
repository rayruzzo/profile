import Education from '../db/education.model';
import connectDB from '../config/db';
import type { Education as EducationType } from "@/types/education";

await connectDB()
const educationFunctions = {
    async createEducation(data: EducationType) {
        const education = new Education(data);
        return await education.save();
    },

    async getAllEducation() {
        return await Education.find();
    },

    async getEducationById(id: string) {
        return await Education.findById(id);
    },

    async updateEducation(id: string, data: Partial<EducationType>) {
        return await Education.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteEducation(id: string) {
        return await Education.findByIdAndDelete(id);
    },
}

export default educationFunctions;