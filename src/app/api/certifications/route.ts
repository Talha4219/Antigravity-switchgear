
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certification from '@/models/Certification';

export async function GET() {
  await connectDB();
  try {
    const certifications = await Certification.find({});
    return NextResponse.json(certifications);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const certification = await Certification.create(body);
    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create certification' }, { status: 400 });
  }
}
