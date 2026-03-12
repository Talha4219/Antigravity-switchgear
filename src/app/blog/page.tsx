'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/data';
import { useData } from '@/hooks/use-data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import * as motion from 'framer-motion/client';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const { data: allPosts, loading, error } = useData<BlogPost[]>('/api/blog');
  const posts = (allPosts || []).filter(p => p.status === 'Published');
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <p className="text-destructive font-semibold text-xl">Failed to load blog posts</p>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
          <div className="h-64 w-64 rounded-full bg-primary blur-[100px]" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-6"
          >
            <Sparkles size={14} /> Knowledge Hub
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
          >
            Industry Insights & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Stay ahead with the latest technical articles, engineering updates, and trends in power distribution and industrial automation.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container max-w-7xl mx-auto mt-8 md:-mt-16 relative z-20 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => {
            const isUrl = typeof post.imageId === 'string' && (post.imageId.startsWith('http') || post.imageId.startsWith('/api'));
            const placeholderImage = placeholderImages.find((p) => p.id === post.imageId);
            const imageUrl = isUrl ? post.imageId : placeholderImage?.imageUrl;
            const imageHint = placeholderImage?.imageHint;

            return (
              <AnimateOnScroll key={post.id} delay={index * 0.1} animation="fade-up">
                <Card
                  className="flex flex-col h-full overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border-border/60 bg-card"
                >
                  <CardHeader className="p-0 border-b border-border/50 relative overflow-hidden aspect-[16/10]">
                    {imageUrl ? (
                      <Link href={`/blog/${post.slug}`} className="block h-full w-full relative">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          data-ai-hint={imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground pointer-events-none"> Article </Badge>
                      </Link>
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-6 px-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="mb-3 block">
                      <h2 className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-semibold text-sm text-primary group-hover:underline">
                        Read Full Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 mb-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-muted'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`cursor-pointer ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-muted'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
}
