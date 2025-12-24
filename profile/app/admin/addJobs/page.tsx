"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddJobForm, { AddJobFormProps } from "@/components/addJobForm";
import AdminFooter from "@/components/adminFooter";

export default function AddJobsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || undefined;
    const [job, setJob] = useState<AddJobFormProps["initialData"] | null>(null);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                const res = await fetch(`/api/job?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setJob(data);
                } else {
                    setJob(null);
                }
                setLoading(false);
            };
            fetchJob();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="">{job ? "Edit Job" : "Add New Job"}</h1>
            <AddJobForm id={id} initialData={job || undefined} />
            <AdminFooter />
        </div>
    );
}