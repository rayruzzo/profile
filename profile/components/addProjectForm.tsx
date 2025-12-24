import React, { useState, useEffect } from "react";
import type { Project } from "@/types/project";

export type AddProjectFormProps = {
  id?: string;
  initialData?: Project;
};

type ProjectWithStringStack = Omit<Project, "techStack"> & { techStack: string };

function AddProjectForm({ id, initialData }: AddProjectFormProps) {
  const [form, setForm] = useState<ProjectWithStringStack>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    techStack: initialData?.techStack ? initialData.techStack.join(", ") : "",
    gh_link: initialData?.gh_link || "",
    live_link: initialData?.live_link || "",
    previewImage: initialData?.previewImage || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        techStack: initialData.techStack ? initialData.techStack.join(", ") : "",
        gh_link: initialData.gh_link || "",
        live_link: initialData.live_link || "",
        previewImage: initialData.previewImage || "",
      });
    }
  }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const techStackArray = form.techStack.split(',').map(tech => tech.trim());
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/projects?id=${id}` : "/api/projects";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, techStack: techStackArray }),
    });
    if (response.ok) {
      alert(id ? "Project updated successfully!" : "Project added successfully!");
      if (!id) {
        setForm({
          name: "",
          description: "",
          techStack: "",
          gh_link: "",
          live_link: "",
          previewImage: "",
        });
      }
    } else {
      alert("Error saving project.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Project Form</h2>
      <form id="project-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Tech Stack (comma separated):
          <input type="text" name="techStack" value={form.techStack} onChange={handleChange} />
        </label>
        <label>
          GitHub Link:
          <input type="text" name="gh_link" value={form.gh_link} onChange={handleChange} />
        </label>
        <label>
          Live Link:
          <input type="text" name="live_link" value={form.live_link} onChange={handleChange} />
        </label>
        <label>
          Preview Image URL:
          <input type="text" name="previewImage" value={form.previewImage} onChange={handleChange} />
        </label>
        <button type="submit">{id ? "Update" : "Add"} Project</button>
      </form>
    </div>
  );
}

export default AddProjectForm;