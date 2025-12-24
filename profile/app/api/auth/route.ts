import { NextRequest, NextResponse } from 'next/server';
import { getUserFromAuth } from "@/util/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromAuth(req);
    return NextResponse.json({ authenticated: true, userId });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, message: err.message }, { status: 401 });
  }
}