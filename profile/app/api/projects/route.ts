import projectModel from "@/db/project.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET() {
    await connectDB();
    const projects = await projectModel.find().lean();
    return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
    await connectDB();
    const data = await request.json();
    const project = new projectModel(data);
    await project.save();
    return NextResponse.json(project, { status: 201 });
}
