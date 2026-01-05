
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certification from '@/models/Certification';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const resolvedParams = await params;
    try {
        const certification = await Certification.findById(resolvedParams.id);
        if (!certification) {
            return NextResponse.json({ success: false, error: 'Certification not found' }, { status: 404 });
        }
        return NextResponse.json(certification);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch certification' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const resolvedParams = await params;
    try {
        const body = await req.json();
        const certification = await Certification.findByIdAndUpdate(resolvedParams.id, body, {
            new: true,
            runValidators: true,
        });
        if (!certification) {
            return NextResponse.json({ success: false, error: 'Certification not found' }, { status: 404 });
        }
        return NextResponse.json(certification);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update certification' }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const resolvedParams = await params;
    try {
        const certification = await Certification.findByIdAndDelete(resolvedParams.id);
        if (!certification) {
            return NextResponse.json({ success: false, error: 'Certification not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete certification' }, { status: 500 });
    }
}
