"use client";
import { useEffect, useState } from "react";
import ResumeForm from "@/components/resumeForm";
import { ResumeFormProps } from "@/components/resumeForm";
import AdminFooter from "@/components/adminFooter";

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeFormProps["initialData"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      const res = await fetch("/api/editResume", {credentials: "include"});
      if (res.ok) {
        const data = await res.json();
        setResume(data.resume);
      } else {
        setResume(null);
      }
      setLoading(false);
    };
    fetchResume();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{resume ? "Edit Resume" : "Create Resume"}</h1>
      <ResumeForm initialData={resume || undefined} />
      <AdminFooter />
    </div>
  );
}