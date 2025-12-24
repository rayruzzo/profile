
import projectModel from "@/db/project.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import type { Project } from "@/types/project";


await connectDB();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
        const project = await projectModel.findById(id).lean();
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project);
    } else {
        const projects = await projectModel.find();
        return NextResponse.json({ projects });
    }
}

export async function POST(request: NextRequest) {
    const data: Project = await request.json();
    const project = new projectModel(data);
    await project.save();
    return NextResponse.json(project as Project, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const data: Project & { id: string } = await request.json();
    const { id, ...updateData } = data;
    const updatedProject = await projectModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProject);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    const deletedProject = await projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted successfully" });
}
