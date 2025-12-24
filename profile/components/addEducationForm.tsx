import React, { useState } from "react";

function AddEducationForm() {
  const [form, setForm] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert("Education added successfully!");
      setForm({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      alert("Error adding education.");
    }
  };

  return (
    <div>
      <h2>Add Education Form</h2>
      <form id="education-form" onSubmit={handleSubmit}>
        <label>
          School:
          <input type="text" name="school" value={form.school} onChange={handleChange} />
        </label>
        <label>
          Degree:
          <input type="text" name="degree" value={form.degree} onChange={handleChange} />
        </label>
        <label>
          Field of Study:
          <input type="text" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} />
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
        <button type="submit">Add Education</button>
      </form>
    </div>
  );
}

export default AddEducationForm;