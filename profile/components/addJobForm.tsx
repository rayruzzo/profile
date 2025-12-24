import React, { useState, useEffect } from "react";
import type { Job } from "@/types/job";

export type AddJobFormProps = {
  id?: string;
  initialData?: Job;
};

function AddJobForm({ id, initialData }: AddJobFormProps) {
  const [form, setForm] = useState<Job>({
    employer: initialData?.employer || "",
    title: initialData?.title || "",
    location: initialData?.location || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    description: Array.isArray(initialData?.description)
      ? initialData?.description
      : (initialData?.description ? [initialData.description] : []),
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        employer: initialData.employer || "",
        title: initialData.title || "",
        location: initialData.location || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        description: Array.isArray(initialData.description)
          ? initialData.description
          : (initialData.description ? [initialData.description] : []),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "description") {
      setForm({ ...form, description: e.target.value.split("\n") });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/job?id=${id}` : "/api/job";
    const payload = { ...form, description: form.description?.filter(line => line.trim() !== "") };
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      alert(id ? "Job updated successfully!" : "Job added successfully!");
      if (!id) {
        setForm({
          employer: "",
          title: "",
          location: "",
          startDate: "",
          endDate: "",
          description: [],
        });
      }
    } else {
      alert("Error saving job.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Job Form</h2>
      <form id="job-form" onSubmit={handleSubmit}>
        <label>
          Employer:
          <input type="text" name="employer" value={form.employer} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={form.location} onChange={handleChange} />
        </label>
        <label>
          Start Date (MM/YYYY):
          <input type="month" name="startDate" value={form.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date (MM/YYYY):
          <input type="month" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={Array.isArray(form.description) ? form.description.join("\n") : ""}
            onChange={handleChange}
            placeholder="Enter each bullet point on a new line"
          ></textarea>
        </label>
        <button type="submit">{id ? "Update" : "Add"} Job</button>
      </form>
    </div>
  );
}

export default AddJobForm;