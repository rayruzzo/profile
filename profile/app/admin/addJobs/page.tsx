"use client";
import AddJobForm from "@/components/addJobForm";
export default function AddJobsPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
            <AddJobForm />
        </div>
    );
}