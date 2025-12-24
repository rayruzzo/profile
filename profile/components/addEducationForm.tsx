import React, { useState, useEffect } from "react";
import type { Education } from "@/types/education";

export type AddEducationFormProps = {
  id?: string;
  initialData?: Education;
};

function AddEducationForm({ id, initialData }: AddEducationFormProps) {
  const [form, setForm] = useState<Education>({
    institution: initialData?.institution || "",
    degree: initialData?.degree || "",
    fieldOfStudy: initialData?.fieldOfStudy || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        institution: initialData.institution || "",
        degree: initialData.degree || "",
        fieldOfStudy: initialData.fieldOfStudy || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/education/${id}` : "/api/education";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert(id ? "Education updated successfully!" : "Education added successfully!");
      if (!id) {
        setForm({
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        });
      }
    } else {
      alert("Error saving education.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Education Form</h2>
      <form id="education-form" onSubmit={handleSubmit}>
        <label>
          Institution:
          <input type="text" name="institution" value={form.institution} onChange={handleChange} />
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
          Start Date (MM/YYYY):
          <input type="month" name="startDate" value={form.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date (MM/YYYY):
          <input type="month" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        </label>
        <button type="submit">{id ? "Update" : "Add"} Education</button>
      </form>
    </div>
  );
}

export default AddEducationForm;