import { NextRequest, NextResponse } from 'next/server';
import Job from '@/db/job.model';

export async function GET() {
  const jobs = await Job.find().lean();
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const job = new Job(data);
  await job.save();
  return NextResponse.json(job, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const { id, ...updateData } = data;
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