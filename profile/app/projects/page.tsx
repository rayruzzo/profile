"use client";
import ProjectDisplay from "@/components/project";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);    
      } else {
        setProjects([]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Projects</h1>
      <section>
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((project: any) => (
          <ProjectDisplay key={project._id} {...project} />
        ))}
      </section>
    </div>
  );
}
