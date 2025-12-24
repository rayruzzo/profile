
import { NextRequest, NextResponse } from 'next/server';
import Job from '@/db/job.model';
import type { Job as JobType } from "@/types/job";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const job = await Job.findById(id).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(job);
  } else {
    const jobs = await Job.find().lean();
    return NextResponse.json(jobs);
  }
}

export async function POST(request: NextRequest) {
  const data: JobType = await request.json();
  const job = new Job(data);
  await job.save();
  return NextResponse.json(job as JobType, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }
  const updateData = await request.json();
  const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedJob) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  return NextResponse.json(updatedJob);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }
  const deletedJob = await Job.findByIdAndDelete(id);
  if (!deletedJob) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Job deleted successfully' });
} 