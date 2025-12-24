import Job from '../db/job.model';
import connectDB from '../config/db';

await connectDB()

import type { Job as JobType } from "@/types/job";

const jobFunctions = {
    async createJob(data: JobType) {
        const job = new Job(data);
        return await job.save();
    },

    async getAllJobs() {
        return await Job.find();
    },

    async getJobById(id: string) {
        return await Job.findById(id);
    },

    async updateJob(id: string, data: Partial<JobType>) {
        return await Job.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteJob(id: string) {
        return await Job.findByIdAndDelete(id);
    },
}

export default jobFunctions;