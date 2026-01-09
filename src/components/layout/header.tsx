'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Search, ArrowRight, Instagram, Linkedin, Facebook, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteDialog } from '@/components/conversion/quote-dialog-provider';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import Logo from './logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavSearch } from './nav-search';
import { allCategories, normalizeSlug } from '@/lib/product-data';

// --- Desktop Nav Data ---

const productCategories = allCategories.map(cat => ({
  title: cat.group,
  items: cat.items
}));

const navLinks = [
  {
    href: '/products',
    label: 'Products',
    isMenu: true,
    isMegaMenu: true,
    items: productCategories,
  },
  {
    href: '/industries',
    label: 'Industries',
    isMenu: true,
    items: [
      { label: 'Factories & Manufacturing', href: '/industries/factories-manufacturing' },
      { label: 'Commercial Buildings', href: '/industries/commercial-buildings' },
      { label: 'Water Treatment', href: '/industries/water-treatment' },
      { label: 'Hospitals', href: '/industries/hospitals' },
      { label: 'Solar Projects', href: '/industries/solar-projects' },
    ]
  },
  { href: '/services', label: 'Services' },
  { href: '/calculators', label: 'Calculators' },
  {
    href: '/about',
    label: 'Company',
    isMenu: true,
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      { label: 'Manufacturing Facility', href: '/manufacturing' },
      { label: 'Knowledge Hub', href: '/resources' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Our Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { openQuoteDialog } = useQuoteDialog();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-[#0B1221] text-white overflow-hidden py-2 px-4 hidden lg:block border-b border-white/5 relative">
        <div className="container flex justify-between items-center relative z-10">
          <div className="flex items-center gap-6 text-[11px] font-medium tracking-wide uppercase opacity-70">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>Leading Switchgear Manufacturer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+923219574003" className="flex items-center gap-2 text-xs hover:text-primary transition-all duration-300">
              <Phone size={14} className="text-primary" />
              <span className="font-bold">+92 321 9574003</span>
            </a>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
              <Link href="#" className="opacity-60 hover:opacity-100 hover:text-primary transition-all"><Facebook size={14} /></Link>
              <Link href="#" className="opacity-60 hover:opacity-100 hover:text-primary transition-all"><Linkedin size={14} /></Link>
              <Link href="#" className="opacity-60 hover:opacity-100 hover:text-primary transition-all"><Instagram size={14} /></Link>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/80 dark:bg-[#0B1221]/80 backdrop-blur-xl shadow-2xl shadow-primary/5 py-1 border-b border-primary/10"
            : "bg-white dark:bg-[#0B1221] py-4 border-b border-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <Logo />
            <div className="absolute -inset-2 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1">
            <div className="bg-muted/30 dark:bg-white/5 px-2 py-1.5 rounded-full border border-border/40 backdrop-blur-md flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.isMenu && pathname.startsWith(link.href));

                if (link.isMenu) {
                  return (
                    <DropdownMenu key={link.href}>
                      <DropdownMenuTrigger
                        className={cn(
                          "relative px-4 py-2 text-[13px] font-bold transition-all duration-300 rounded-full flex items-center gap-1.5 focus:outline-none",
                          isActive ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                        )}
                        onMouseEnter={() => setHoveredLink(link.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        {link.label}
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", hoveredLink === link.label && "rotate-180")} />
                      </DropdownMenuTrigger>

                      {link.isMegaMenu ? (
                        <DropdownMenuContent
                          align="center"
                          className="w-[100vw] lg:w-[1000px] p-0 border-primary/20 bg-white/95 dark:bg-[#0B1221]/95 backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-300 rounded-3xl overflow-hidden"
                        >
                          <div className="grid grid-cols-12 h-[550px]">
                            {/* Mega Menu Branding Sidebar */}
                            <div className="col-span-3 bg-primary/5 p-10 border-r border-primary/10 flex flex-col justify-between">
                              <div>
                                <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
                                  <ExternalLink size={24} />
                                </div>
                                <h3 className="font-headline font-black text-3xl text-primary leading-tight mb-4">Precision Engineering</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                  Every unit is a masterpiece of safety and reliability, fabricated using Pakistan's largest CNC laser cutting technology.
                                </p>
                              </div>
                              <Button asChild className="rounded-xl h-12 font-bold group">
                                <Link href="/products" className="flex items-center gap-2">
                                  View All Categories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            </div>

                            {/* Mega Menu Content */}
                            <div className="col-span-9 p-8">
                              <ScrollArea className="h-full pr-4">
                                <div className="grid grid-cols-3 gap-8">
                                  {link.items.map((category: any, idx: number) => (
                                    <div key={idx} className="group/cat">
                                      <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-4 opacity-70 group-hover/cat:opacity-100 transition-opacity">
                                        <span className="h-[2px] w-4 bg-primary rounded-full" />
                                        {category.title}
                                      </h4>
                                      <ul className="space-y-2">
                                        {category.items.map((item: string) => (
                                          <li key={item}>
                                            <Link
                                              href={`/products/${normalizeSlug(item)}`}
                                              className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-all duration-200"
                                            >
                                              <span className="h-1 w-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
                                              {item}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </div>
                        </DropdownMenuContent>
                      ) : (
                        <DropdownMenuContent
                          align="center"
                          className="w-64 p-2 bg-white/95 dark:bg-[#0B1221]/95 backdrop-blur-2xl border-primary/20 shadow-2xl rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300"
                        >
                          {link.items?.map((item: any) => (
                            <DropdownMenuItem key={item.label} asChild className="focus:bg-primary/10 rounded-xl transition-colors">
                              <Link
                                href={item.href}
                                className="w-full flex items-center justify-between p-3 text-sm font-bold text-foreground/80 hover:text-primary"
                              >
                                {item.label} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-5 py-2 text-[13px] font-bold transition-all duration-300 rounded-full",
                      isActive ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <NavSearch />
              <ThemeToggle />
            </div>

            <Button
              onClick={() => openQuoteDialog()}
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              Get a Quote
            </Button>

            {/* Mobile Nav Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden h-12 w-12 rounded-2xl bg-muted/40 hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[450px] p-0 border-l border-primary/10 bg-white dark:bg-[#0B1221] overflow-hidden flex flex-col">
                <SheetHeader className="p-8 border-b border-primary/5 text-left flex flex-row items-center justify-between">
                  <div>
                    <Logo />
                    <SheetTitle className="sr-only">Main Menu</SheetTitle>
                    <SheetDescription className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">
                      Precision Power Solutions
                    </SheetDescription>
                  </div>
                  <ThemeToggle />
                </SheetHeader>

                <ScrollArea className="flex-1 px-8 py-6">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      if (link.isMenu) {
                        return (
                          <Collapsible key={link.href} className="w-full border-b border-primary/5 py-2">
                            <CollapsibleTrigger className="flex w-full items-center justify-between text-2xl font-black text-foreground py-4 group">
                              {link.label}
                              <ChevronDown className="h-6 w-6 text-primary transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pb-4 space-y-4">
                              {link.isMegaMenu ? (
                                link.items.map((category: any, idx: number) => (
                                  <div key={idx} className="mt-4 first:mt-2">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 mb-3">{category.title}</h5>
                                    <div className="grid grid-cols-1 gap-2">
                                      {category.items.map((item: string) => (
                                        <Link
                                          key={item}
                                          href={`/products/${normalizeSlug(item)}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-3 py-2 text-base font-bold text-muted-foreground hover:text-primary transition-colors"
                                        >
                                          <div className="h-1.5 w-1.5 rounded-full bg-border" />
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="grid grid-cols-1 gap-1 pt-2">
                                  {link.items?.map((item: any) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-3 py-3 text-lg font-bold text-muted-foreground hover:text-primary border-b border-primary/5 last:border-0"
                                    >
                                      <div className="h-2 w-2 rounded-full bg-primary/20" />
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      }
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-2xl font-black text-foreground py-5 border-b border-primary/5 hover:text-primary transition-colors flex items-center justify-between group"
                        >
                          {link.label}
                          <ArrowRight className="h-6 w-6 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-12 space-y-8">
                    <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                      <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                        <Phone size={20} className="text-primary" /> Contact Sales
                      </h4>
                      <div className="space-y-4">
                        <a href="tel:+923219574003" className="block text-2xl font-black hover:text-primary transition-colors">+92 321 9574003</a>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <Mail size={18} /> <span>sales@egswitchgear.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <MapPin size={18} /> <span className="text-xs">Plot # 56, Street # 13, Sector I-9/2, Islamabad</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-8 py-4">
                      <Link href="#" className="h-12 w-12 rounded-2xl bg-muted/40 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"><Facebook size={24} /></Link>
                      <Link href="#" className="h-12 w-12 rounded-2xl bg-muted/40 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"><Linkedin size={24} /></Link>
                      <Link href="#" className="h-12 w-12 rounded-2xl bg-muted/40 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"><Instagram size={24} /></Link>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-8 border-t border-primary/5">
                  <Button
                    variant="default"
                    size="xl"
                    className="w-full h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteDialog();
                    }}
                  >
                    Request a Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
