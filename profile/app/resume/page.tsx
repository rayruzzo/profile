"use client";
import { useEffect, useState } from "react";
import ResumeDisplay from '../../components/resume';
import JobDisplay from '../../components/job';
import EducationDisplay from '../../components/education';
import type { IResume } from "@/db/resume.model";

export default function ResumePage() {
  const [resume, setResume] = useState<IResume | null>(null);
  const [jobs, setJobs] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      const res = await fetch("/api/resume");
      if (res.ok) {
        const data = await res.json();
        setResume(data.resume);
        setJobs(data.jobs || []);
        setEducation(data.education || []);
      } else {
        setResume(null);
        setJobs([]);
        setEducation([]);
      }
      setLoading(false);
    };
    fetchResume();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!resume) return <div>No resume found.</div>;

  return (
    <div>
      {resume && <ResumeDisplay {...resume} />}
      <section>
        <h2>Experience</h2>
        {jobs.map((job: any) => (
          <JobDisplay key={job._id} {...job} />
        ))}
      </section>
      <section>
        <h2>Education</h2>
        {education.map((edu: any) => (
          <EducationDisplay key={edu._id} {...edu} />
        ))}
      </section>
    </div>
  );
}