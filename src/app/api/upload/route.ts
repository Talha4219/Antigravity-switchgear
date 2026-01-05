
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Image from '@/models/Image';

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = (file as any).name || 'uploaded-image';
    const contentType = file.type;

    const newImage = await Image.create({
      filename,
      contentType,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      imageId: newImage._id.toString(),
      url: `/api/images/${newImage._id.toString()}`
    }, { status: 201 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
