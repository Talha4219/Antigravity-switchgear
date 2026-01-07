'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, Printer, Facebook, Linkedin, Instagram, ArrowRight, ChevronRight, Send, Loader2 } from 'lucide-react';
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
  { name: 'Manufacturing Facility', href: '/manufacturing' },
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
              <div className="flex items-center gap-4 text-gray-400 group hover:text-white transition-colors">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Printer size={18} className="text-primary" />
                </div>
                <span className="text-sm">Fax: +92 51 4864908</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group hover:text-white transition-colors">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px] text-primary"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-sm">WhatsApp: +92 321 9574003</span>
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
          <p>&copy; {currentYear} Evergreen Switchgear. All rights reserved.</p>
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
