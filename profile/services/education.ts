import Education from '../db/education.model';

const educationFunctions = {
    async createEducation(data: {
        institution: string;
        degree: string;
        fieldOfStudy: string;
        startDate: Date;
        endDate?: Date;
    }) {
        const education = new Education(data);
        return await education.save();
    },

    async getAllEducation() {
        return await Education.find();
    },

    async getEducationById(id: string) {
        return await Education.findById(id);
    },
    
    async updateEducation(id: string, data: Partial<{
        institution: string;
        degree: string;
        fieldOfStudy: string;
        startDate: Date;
        endDate?: Date;
    }>) {
        return await Education.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteEducation(id: string) {
        return await Education.findByIdAndDelete(id);
    },
}

export default educationFunctions;