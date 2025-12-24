
import educationFunctions from "@/services/education";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
        const education = await educationFunctions.getEducationById(id);
        if (!education) {
            return NextResponse.json({ message: "Education not found" }, { status: 404 });
        }
        return NextResponse.json(education);
    } else {
        const educations = await educationFunctions.getAllEducation();
        return NextResponse.json({ education: educations });
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const newEducation = await educationFunctions.createEducation(data);
    return NextResponse.json(newEducation, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const data = await request.json();
    const { id, ...updateData } = data;
    const updatedEducation = await educationFunctions.updateEducation(id, updateData);
    if (!updatedEducation) {
        return NextResponse.json({ message: "Education not found" }, { status: 404 });
    }
    return NextResponse.json(updatedEducation);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const deletedEducation = await educationFunctions.deleteEducation(id);
    if (!deletedEducation) {
        return NextResponse.json({ message: "Education not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Education deleted successfully" });
}