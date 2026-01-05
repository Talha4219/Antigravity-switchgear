import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Share2, User, Clock } from 'lucide-react';
import connectDB from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { Metadata } from 'next';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill Image styles

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ status: 'Published' }).select('slug').lean();
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) {
      return { title: 'Post Not Found' };
    }
    // @ts-ignore
    return {
      title: `${post.title} | EgSwitchGear Insights`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author]
      }
    };
  } catch (error) {
    return { title: 'EgSwitchGear Insights' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  let post = null;
  let relatedPosts: any[] = [];

  try {
    await connectDB();
    post = await BlogPost.findOne({ slug: resolvedParams.slug }).lean();

    if (post) {
      // Fetch related posts (simple implementation: get 3 latest posts excluding current)
      relatedPosts = await BlogPost.find({
        status: 'Published',
        slug: { $ne: resolvedParams.slug }
      })
        .sort({ date: -1 })
        .limit(3)
        .lean();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    notFound();
  }

  // @ts-ignore
  const { title, author, date, imageId, excerpt, content } = post;

  const isUrl = typeof imageId === 'string' && (imageId.startsWith('http://') || imageId.startsWith('https://'));
  const isApiPath = typeof imageId === 'string' && imageId.startsWith('/api/images');
  const placeholderImage = placeholderImages.find((p) => p.id === imageId);
  const resolvedImageUrl = isUrl || isApiPath ? imageId : placeholderImage?.imageUrl;
  // Fallback image if nothing resolves
  const finalImage = resolvedImageUrl || '/hero-image.png';

  const authorInitial = author.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

  // Estimate reading time
  const words = content.split(' ').length;
  const readTime = Math.ceil(words / 200);


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navigation / Header */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container py-8">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Industry Insights</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {readTime} min read</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {date}</span>
          </div>
          <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold text-foreground leading-tight max-w-4xl">
            {title}
          </h1>

          <div className="mt-8 flex items-center justify-between border-t border-primary/10 pt-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`} />
                <AvatarFallback>{authorInitial}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{author}</span>
                <span className="text-xs text-muted-foreground">Editor & Engineer</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="container max-w-7xl mx-auto px-4 mt-8 md:mt-12">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column: Article */}
          <main className="lg:col-span-8">
            {finalImage && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-8 md:mb-10">
                <Image
                  src={finalImage}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <article className="max-w-none space-y-6">
              <p className="lead text-xl md:text-2xl text-muted-foreground font-medium italic border-l-4 border-accent pl-6 py-2 max-w-3xl">
                {excerpt}
              </p>

              <div className="mt-8 not-prose ql-snow max-w-3xl">
                <div className="ql-editor p-0" dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              {/* 13. Final CTA - Conversion Moment */}
              <div className="my-16 bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl shadow-xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern-grid.png')] opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold font-headline mb-4">Ready to Upgrade?</h3>
                  <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                    Get a custom quote for your industrial switchgear needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary" className="font-semibold text-primary">
                      <Link href="/contact">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Latest Posts Widget */}
            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Latest Posts
              </h3>
              <div className="space-y-6">
                {relatedPosts.map((post: any) => {
                  const rImageId = post.imageId;
                  const rPlaceholder = placeholderImages.find((p) => p.id === rImageId);
                  const rImageUrl = (typeof rImageId === 'string' && (rImageId.startsWith('http') || rImageId.startsWith('/api'))) ? rImageId : rPlaceholder?.imageUrl || '/hero-image.png';

                  return (
                    <Link key={post._id} href={`/blog/${post.slug}`} className="group flex gap-4 items-start">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                        <Image
                          src={rImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-bold text-sm mb-4">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {['Industry News', 'Technical Guides', 'Case Studies'].map(tag => (
                    <Badge key={tag} variant="secondary" className="hover:bg-primary/20 cursor-pointer transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
