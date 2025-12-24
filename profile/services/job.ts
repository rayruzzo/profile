import Job from '../db/job.model';

const jobFunctions = {
    async createJob(data: {
        employer: string;
        title: string;
        location: string;
        startDate: Date;
        endDate?: Date;
        description?: string;
    }) {
        const job = new Job(data);
        return await job.save();
    },

    async getAllJobs() {
        return await Job.find();
    },

    async getJobById(id: string) {
        return await Job.findById(id);
    },
    
    async updateJob(id: string, data: Partial<{
        employer: string;
        title: string;
        location: string;
        startDate: Date;
        endDate?: Date;
        description?: string;
    }>) {
        return await Job.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteJob(id: string) {
        return await Job.findByIdAndDelete(id);
    },
}

export default jobFunctions;