import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPost from '@/models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    const blogPosts = await BlogPost.find({});
    const formattedBlogPosts = blogPosts.map(doc => ({
      ...doc.toObject(),
      id: doc._id.toString(),
    }));
    return NextResponse.json(formattedBlogPosts);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const blogPost = await BlogPost.create(body);
    return NextResponse.json({ ...blogPost.toObject(), id: blogPost._id.toString() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
