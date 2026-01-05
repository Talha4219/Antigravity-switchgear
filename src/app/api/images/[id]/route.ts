
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Image from '@/models/Image';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    await connectDB();
    const image = await Image.findById(resolvedParams.id);

    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', image.contentType);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(image.data, { headers });
  } catch (error) {
    console.error('Image Fetch Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
