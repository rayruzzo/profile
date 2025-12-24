import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../../../config/db';
import User from '../../../db/user.model';

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET!, { expiresIn: '1d' });

  const res = NextResponse.json({ message: 'Login successful', userId: user._id, isAdmin: user.isAdmin });
  res.cookies.set('auth', token, { httpOnly: true, path: '/' });

  return res;
}
