import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Offer from '@/models/Offer';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const offer = await Offer.findById(params.id);
    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json({ ...offer.toObject(), id: offer._id.toString() });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectDB();
    const offer = await Offer.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json({ ...offer.toObject(), id: offer._id.toString() });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const offer = await Offer.findByIdAndDelete(params.id);
    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Offer deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
