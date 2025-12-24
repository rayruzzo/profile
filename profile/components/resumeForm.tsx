import React, { useState, useEffect } from "react";

export type ResumeFormProps = {
  initialData?: {
    name: string;
    tagline?: string;
    email: string;
    phone?: string;
    location?: string;
    summary?: string;
    linkedin?: string;
    github?: string;
    avatar?: string;
  };
};

function ResumeForm(props: ResumeFormProps) {
  const { initialData } = props;
  const [name, setName] = useState(initialData?.name || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || "");
  const [github, setGithub] = useState(initialData?.github || "");
  const [avatar, setAvatar] = useState(initialData?.avatar || "");

  useEffect(() => {
    setName(initialData?.name || "");
    setTagline(initialData?.tagline || "");
    setEmail(initialData?.email || "");
    setPhone(initialData?.phone || "");
    setLocation(initialData?.location || "");
    setSummary(initialData?.summary || "");
    setLinkedin(initialData?.linkedin || "");
    setGithub(initialData?.github || "");
    setAvatar(initialData?.avatar || "");
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = initialData ? "PUT" : "POST";
    const response = await fetch("/api/editResume", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, tagline, email, phone, location, summary, linkedin, github, avatar }),
    });
    if (response.ok) {
      alert("Resume saved successfully!");
    } else {
      alert("Error saving resume.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Tagline" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="Summary" />
      <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn" />
      <input type="text" value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub" />
      <input type="text" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar URL" />
      <button type="submit">Save Resume</button>
    </form>
  );
}

export default ResumeForm;