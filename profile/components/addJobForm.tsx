import React, { useState } from "react";

function AddJobForm() {
  const [form, setForm] = useState({
    employer: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert("Job added successfully!");
      setForm({
        employer: "",
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      alert("Error adding job.");
    }
  };

  return (
    <div>
      <h2>Add Job Form</h2>
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
          Start Date:
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJobForm;