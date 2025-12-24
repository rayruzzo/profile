import { NextRequest, NextResponse } from "next/server";
import resumeFunctions from "@/services/resume";
import connectDB from "@/config/db";
import { getUserFromAuth } from "@/util/auth";


console.log("editResume API file loaded");
await connectDB();

export async function GET(req: NextRequest) {
    console.log("editResume GET handler called");
    try {
        const decoded = getUserFromAuth(req);
        console.log("Decoded user ID from token:", decoded);
        const resume = await resumeFunctions.getResumeById(decoded);
        console.log("Fetched resume for user:", decoded);
        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }
        console.log("Resume data:", resume);
        return NextResponse.json({ resume: resume });
    } catch {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const decoded = getUserFromAuth(request);
    data.userId = decoded;
    const resume = await resumeFunctions.createResume(data);
    return NextResponse.json(resume, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const data = await request.json();
    const decoded = getUserFromAuth(request);
    if (!decoded) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const existingResume = await resumeFunctions.getResumeById(decoded);
    if (!existingResume) {
        return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }
    const updatedResume = await resumeFunctions.updateResume(existingResume._id, data);
    return NextResponse.json(updatedResume);
}

export async function DELETE(request: NextRequest) {
    const decoded = getUserFromAuth(request);
    const existingResume = await resumeFunctions.getResumeById(decoded);
    if (!existingResume) {
        return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }
    await resumeFunctions.deleteResume(existingResume._id);
    return NextResponse.json({ message: "Resume deleted successfully" });
}