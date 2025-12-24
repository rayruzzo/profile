import {NextResponse} from 'next/server';
import resumeFunctions from '@/services/resume';
import jobFunctions from '@/services/job';
import educationFunctions from '@/services/education';

export async function GET() {
  const admin_id = process.env.ADMIN_ID;
  const resume = await resumeFunctions.getResumeById(admin_id!);
  console.log("Fetched resume for admin:", admin_id);
  if (!resume) {
    return NextResponse.json({message: 'Resume not found'}, {status: 404});
  }
  console.log("Resume data:", resume);
  const jobs = await jobFunctions.getAllJobs();
  const education = await educationFunctions.getAllEducation();

  return NextResponse.json({ resume: resume, jobs: jobs, education: education });
}