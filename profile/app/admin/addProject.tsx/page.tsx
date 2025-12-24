"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddProjectForm, { AddProjectFormProps } from "@/components/addProjectForm";

export default function AddProjectPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || undefined;
    const [project, setProject] = useState<AddProjectFormProps["initialData"] | null>(null);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                const res = await fetch(`/api/projects?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                } else {
                    setProject(null);
                }
                setLoading(false);
            };
            fetchProject();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{project ? "Edit Project" : "Add New Project"}</h1>
            <AddProjectForm id={id} initialData={project || undefined} />
        </div>
    );
}