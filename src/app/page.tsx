import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BadgeCheck, CheckCircle2, Factory, FileText, Globe, Lightbulb, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { allCategories, normalizeSlug } from '@/lib/product-data';
import { Metadata } from 'next';
import connectDB from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { placeholderImages } from '@/lib/placeholder-images';
import { Calendar, Monitor, Cpu as CpuIcon, Layers, Zap as ZapIcon, Shield as ShieldIcon } from 'lucide-react';
import * as motion from 'framer-motion/client';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';
import { Snowfall } from 'react-snowfall';


export const metadata: Metadata = {
  title: 'EgSwitchGear | Premium Industrial Switchgear & Power Solutions',
  description: 'Leading manufacturer of LV/MV Switchgear, Power Distribution Panels, and Industrial Automation systems in Pakistan. IEC Compliant & ISO Certified.',
};

// Map categories to icons/images for visual appeal
const categoryIcons: Record<string, any> = {
  'Electrical Power Panels': Zap,
  'Cable Management Solutions': Factory,
  'Industrial Automation': CogIcon,
  'Lighting & Emergency Systems': Lightbulb,
  'Security & Safety Solutions': Shield,
  'Solar Systems': Globe,
};

function CogIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

export default async function Home() {
  let latestPosts: any[] = [];
  try {
    await connectDB();
    latestPosts = await BlogPost.find({ status: 'Published' })
      .sort({ date: -1 })
      .limit(3)
      .lean();
  } catch (error) {
    console.error('Failed to fetch latest posts:', error);
    // Continue rendering even if DB is down
  }

  return (
    <div className="flex flex-col min-h-dvh">

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0F1C] pt-20 pb-12">
          {/* Background Image / Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-image.webp" // Ensure this exists or fallback
              alt="Industrial Switchgear Facility"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-[#0A0F1C]/80" />
          </div>

          <div className="relative z-10 container px-4 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 md:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs md:text-sm font-medium tracking-wide uppercase">IEC Compliant Engineering</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-white mb-6 drop-shadow-2xl"
            >
              Powering Industries with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
                Precision & Reliability
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl text-gray-400 max-w-2xl mb-8 md:mb-10 leading-relaxed px-2"
            >
              We design and manufacture premium Low Voltage Switchgear, PFI Plants, and Automation Panels engineered for maximum efficiency and safety.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0"
            >
              <Button asChild size="lg" className="h-12 md:h-14 px-8 text-base md:text-lg font-semibold shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all w-full sm:w-auto">
                <Link href="/products">Explore Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-8 text-base md:text-lg bg-transparent border-gray-700 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* --- KEY BENEFITS --- */}
        <section className="py-12 md:py-20 bg-background border-b border-border/50">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'IEC Standards', desc: 'Compliant with IEC 61439-1 & IEC 60947 for global safety assurance.', icon: Globe },
                { title: 'Custom Fabrication', desc: 'In-house CNC manufacturing tailored to your facility dimensions.', icon: Factory },
                { title: '24/7 Support', desc: 'Dedicated engineering team for installation and maintenance support.', icon: CheckCircle2 }
              ].map((item, i) => (
                <AnimateOnScroll key={i} delay={i * 0.1} animation="fade-up">
                  <div className="flex gap-4 p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors h-full">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* --- SOLUTONS / CATEGORIES --- */}
        <section className="py-12 md:py-24 bg-muted/20">
          <div className="container px-4">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-headline font-bold mb-4">Comprehensive Power Solutions</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                From power distribution to industrial automation, we deliver end-to-end electrical infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.slice(0, 6).map((cat, idx) => {
                const Icon = categoryIcons[cat.group] || Zap;
                const firstItemSlug = normalizeSlug(cat.items[0]);
                const linkHref = `/products/${firstItemSlug}`;

                return (
                  <AnimateOnScroll key={idx} delay={idx * 0.1} animation="scale-up">
                    <Link href={linkHref} className="group relative overflow-hidden rounded-2xl border bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 block h-full">
                      <div className="p-8 h-full flex flex-col">
                        <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 pr-8 group-hover:text-primary transition-colors">{cat.group}</h3>
                        <p className="text-muted-foreground text-sm mb-6 flex-grow">
                          Includes {cat.items.slice(0, 3).join(', ')}...
                        </p>
                        <div className="flex items-center text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          View Products <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="/products">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- STATS / TRUST --- */}
        <section className="py-12 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern-grid.png')] opacity-10" />
          <div className="container px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <AnimateOnScroll animation="fade-right">
                <div>
                  <h2 className="text-2xl md:text-5xl font-headline font-bold mb-4 md:mb-6">Built on Trust & Engineering Excellence</h2>
                  <p className="text-primary-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
                    We don't just build panels; we engineer safety and reliability. Our rigorous testing protocols ensure every unit that leaves our factory is ready for the toughest industrial environments.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl font-bold mb-1">2,500+</div>
                      <div className="text-sm opacity-70 uppercase tracking-widest">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-1">150+</div>
                      <div className="text-sm opacity-70 uppercase tracking-widest">Enterprise Clients</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-left">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <BadgeCheck className="h-6 w-6 text-accent" /> Our Certifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['ISO 9001:2015', 'IEC 61439 Type Tested', 'PEC Registered', 'Engineering Council'].map((cert, i) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm bg-white/10 rounded-lg p-3"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {cert}
                      </motion.div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-8 bg-white text-primary hover:bg-gray-100">
                    <Link href="/certifications">View All Certifications</Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* --- BLOG SECTION --- */}
        {latestPosts.length > 0 && (
          <section className="py-12 md:py-24 bg-muted/30">
            <div className="container px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
                <div>
                  <h2 className="text-2xl md:text-5xl font-headline font-bold mb-4">Latest Insights</h2>
                  <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                    Stay updated with industry trends, technical guides, and company news.
                  </p>
                </div>
                <Button asChild variant="outline" className="hidden md:flex">
                  <Link href="/blog">View All Articles</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {latestPosts.map((post: any, idx: number) => {
                  const isUrl = typeof post.imageId === 'string' && (post.imageId.startsWith('http') || post.imageId.startsWith('/api'));
                  const placeholderImage = placeholderImages.find((p) => p.id === post.imageId);
                  const imageUrl = isUrl ? post.imageId : placeholderImage?.imageUrl || '/hero-image.png';

                  return (
                    <AnimateOnScroll key={post._id} delay={idx * 0.1} animation="fade-up">
                      <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                            <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
                              <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-sm font-semibold text-primary">
                            Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </AnimateOnScroll>
                  );
                })}
              </div>

              <div className="mt-12 text-center md:hidden">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog">View All Articles</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* --- CTA --- */}
        <section className="py-12 md:py-24 bg-background overflow-hidden">
          <div className="container px-4 text-center">
            <AnimateOnScroll animation="scale-up" threshold={0.3}>
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl font-headline font-bold">Ready to Optimize Your Power Infrastructure?</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Get a customized quote for your facility today. Our engineers are ready to assist with design and specifications.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                  <Button asChild size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg shadow-xl w-full sm:w-auto">
                    <Link href="/contact">Get a Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg w-full sm:w-auto">
                    <Link href="tel:+923001234567">Call Sales Team</Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
    </div>
  );
}
