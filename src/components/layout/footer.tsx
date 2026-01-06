'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, Facebook, Linkedin, Instagram, Twitter, ArrowRight, ChevronRight, Send, Loader2 } from 'lucide-react';
import Logo from './logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const productLinks = [
  { name: 'LT Switchgear Panels', href: '/products/lt-switchgear-panels' },
  { name: 'HT Switchgear Panels', href: '/products/ht-switchgear-panels' },
  { name: 'PFI Plants', href: '/products/pfi-plant' },
  { name: 'Cable Trays', href: '/products/cable-trays' },
  { name: 'Solar Solutions', href: '/products/solar-systems' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Why Choose Us', href: '/why-choose-us' },
  { name: 'Our Projects', href: '/projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Knowledge Hub', href: '/resources' },
  { name: 'Contact Us', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-conditions' },
  { name: 'Sitemap', href: '/sitemap.xml' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: 'Newsletter Subscriber',
          type: 'newsletter',
          subject: 'New Newsletter Subscription',
        }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      toast({
        title: "Successfully Subscribed!",
        description: "You've been added to our mailing list.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Check your email and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#0B1221] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opactiy-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-400 leading-relaxed text-[15px] font-light max-w-sm">
              Pioneering safe and reliable power distribution solutions since 1985. We engineer excellence into every panel for industrial, commercial, and residential projects.
            </p>

            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-4 text-gray-400 group hover:text-white transition-colors">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="text-sm leading-6">Plot # 56, Street # 13, I-9/2,<br />Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group hover:text-white transition-colors">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <span className="text-sm">admin@egswitchgear.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group hover:text-white transition-colors">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <span className="text-sm">+92 51 4864909</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Products (2 cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-headline font-semibold text-lg text-white mb-6 flex items-center gap-2">
              Products
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-[15px] flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-headline font-semibold text-lg text-white mb-6 flex items-center gap-2">
              Company
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-[15px] flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (4 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-secondary/5 rounded-2xl p-6 border border-white/5">
              <h3 className="font-headline font-semibold text-lg text-white mb-2">Stay Connected</h3>
              <p className="text-gray-400 text-sm mb-6">
                Join our newsletter to receive the latest technical updates, price lists, and industry news.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary/10 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary focus-visible:border-primary pl-4 pr-12"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full font-semibold shadow-lg shadow-primary/20">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>Subscribe <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} EgSwitchgear. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>Designed & Secured by</span>
            <span className="text-gray-300 font-medium"><Link href="https://talhashams.vercel.app" target="_blank">Agilex Developers</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
