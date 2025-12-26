"use client";
import { useEffect, useState } from "react";
import ResumeDisplay from '../../components/resume';
import JobDisplay from '../../components/job';
import EducationDisplay from '../../components/education';
import type { IResume } from "@/db/resume.model";
import { downloadPDFFromMarkdown } from '@/services/downloadMarkdown';

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

  const handleDownloadPDF = () => {
    if (resume) {
      downloadPDFFromMarkdown({ resume, jobs, education }, 'ray-ruzzo-resume.pdf');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!resume) return <div>No resume found.</div>;

  return (
    <>
      <div className="resume-actions">
        <button onClick={handleDownloadPDF} className="btn">Download PDF</button>
      </div>
      <div id="resume-content" className="resume-container">
        {resume && <ResumeDisplay {...JSON.parse(JSON.stringify(resume))} />}
        <h2>Experience</h2>
        {jobs.map((job: any) => (
          <JobDisplay key={job._id} {...job} />
        ))}
        <h2>Education</h2>
        {education.map((edu: any) => (
          <EducationDisplay key={edu._id} {...edu} />
        ))}
    </div>
    </>
  );
}