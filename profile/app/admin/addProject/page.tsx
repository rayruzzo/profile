"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddProjectForm from "@/components/addProjectForm";
import type { Project } from "@/types/project";
import AdminFooter from "@/components/adminFooter";

export default function AddProjectPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || undefined;
  const [project, setProject] = useState<Project | null>(null);
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
      <h1>{project ? "Edit Project" : "Add New Project"}</h1>
      <AddProjectForm id={id} initialData={project || undefined} />
      <AdminFooter />
    </div>
  );
}
