import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getUserFromAuth(req: NextRequest): string {
  const token = req.cookies.get("auth")?.value;
  if (!token) throw new Error("Unauthorized");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.userId;
  } catch {
    throw new Error("Invalid token");
  }
}
