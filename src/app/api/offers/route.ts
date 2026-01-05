import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Offer from '@/models/Offer';

export async function GET() {
  try {
    await connectDB();
    const offers = await Offer.find({});
    const formattedOffers = offers.map(doc => ({
      ...doc.toObject(),
      id: doc._id.toString(),
    }));
    return NextResponse.json(formattedOffers);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const offer = await Offer.create(body);
    return NextResponse.json({ ...offer.toObject(), id: offer._id.toString() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
