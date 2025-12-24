import projectFunctions from "@/services/project";
import React, { useState } from "react";

function AddProjectForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: "",
    gh_link: "",
    live_link: "",
    previewImage: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const techStackArray = form.techStack.split(',').map(tech => tech.trim());
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, techStack: techStackArray }),
    });
    if (response.ok) {
      alert("Project added successfully!");
      setForm({
        name: "",
        description: "",
        techStack: "",
        gh_link: "",
        live_link: "",
        previewImage: "",
      });
    } else {
      alert("Error adding project.");
    }
  };

  return (
    <div>
      <h2>Add Project Form</h2>
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
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProjectForm;