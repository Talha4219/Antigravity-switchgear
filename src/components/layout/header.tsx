'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
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

// --- Components ---

function QuoteTriggerButton() {
  const { openQuoteDialog } = useQuoteDialog();
  return (
    <Button
      onClick={() => openQuoteDialog()}
      className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 font-semibold px-6"
    >
      Get a Quote
    </Button>
  );
}

// --- Data ---
import { allCategories } from '@/lib/product-data';

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({
    href,
    label,
    isMobile = false,
  }: {
    href: string;
    label: string;
    isMobile?: boolean;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          'transition-all duration-300 relative group',
          isActive ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary',
          isMobile ? 'text-xl py-3 block font-medium border-b border-border/50' : 'text-sm font-medium tracking-wide'
        )}
      >
        {label}
        {!isMobile && (
          <span className={cn(
            "absolute -bottom-[21px] left-0 w-full h-[3px] bg-primary rounded-t-full origin-bottom transition-transform duration-300",
            isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
          )} />
        )}
      </Link>
    );
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* Top Bar for contact info - Optional for "Industrial" feel */}
      <div className="bg-[#0B1221] text-white text-[10px] md:text-xs py-1.5 px-4 hidden sm:block">
        <div className="container flex justify-between items-center">
          <span className="opacity-80">Leading Manufacturer of Industrial Switchgear & Automated Solutions</span>
          <div className="flex items-center gap-4">
            <a href="tel:+923001234567" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone size={12} className="text-primary" />
              <span className="font-medium">Sales: +92 300 123 4567</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-md",
          scrolled
            ? "bg-background/95 border-border/40 shadow-sm py-2"
            : "bg-background/80 border-transparent py-4"
        )}
      >
        <div className="container flex h-14 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 mr-8">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-6 flex-1 justify-center">
            {navLinks.map((link) => {
              if (link.isMenu) {
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger className={cn(
                      "flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus:outline-none px-3 py-2 rounded-md hover:bg-accent/50",
                      pathname.startsWith(link.href) && "text-primary font-bold bg-accent/30"
                    )}>
                      {link.label} <ChevronDown className="h-4 w-4 opacity-50" />
                    </DropdownMenuTrigger>

                    {link.isMegaMenu ? (
                      <DropdownMenuContent align="center" className="w-[90vw] max-w-[1000px] p-0 border-border/40 shadow-2xl bg-background/95 backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
                        <div className="grid grid-cols-12 h-[500px]">
                          {/* Decorative Sidebar */}
                          <div className="col-span-3 bg-muted/30 p-8 border-r border-border/50">
                            <h3 className="font-headline font-bold text-2xl mb-4 text-primary">Our Products</h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                              Explore our comprehensive range of industrial power distribution and automation solutions, engineered for safety and reliability.
                            </p>
                            <Button variant="outline" className="w-full justify-between" asChild>
                              <Link href="/products">All Products <ChevronDown className="rotate-270 h-4 w-4" /></Link>
                            </Button>
                          </div>

                          {/* Content Grid */}
                          <div className="col-span-9 p-8">
                            <ScrollArea className="h-full pr-6">
                              <div className="grid grid-cols-3 gap-x-8 gap-y-10">
                                {/* @ts-ignore */}
                                {link.items.map((category: any, idx: number) => (
                                  <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-border/50 pb-2 mb-2">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                      <h4 className="font-bold text-sm leading-tight text-foreground/90">{category.title}</h4>
                                    </div>
                                    <ul className="space-y-2">
                                      {/* @ts-ignore */}
                                      {category.items.map((item: string) => (
                                        <li key={item}>
                                          <Link
                                            href={`/products/${item.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}
                                            className="block text-[13px] text-muted-foreground hover:text-primary hover:underline transition-all"
                                          >
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
                      <DropdownMenuContent align="start" className="w-56 p-1 animate-in fade-in-0 zoom-in-95 border-border/40 bg-background/95 backdrop-blur-xl">
                        {/* @ts-ignore */}
                        {link.items?.map((item: any) => (
                          <DropdownMenuItem key={item.label} asChild>
                            <Link
                              href={item.href}
                              className="w-full cursor-pointer py-2.5 px-3 font-medium text-sm text-foreground/80 focus:text-primary focus:bg-primary/10 rounded-sm"
                            >
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                );
              }
              return (
                <NavLink key={link.href} href={link.href} label={link.label} />
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NavSearch />
            <ThemeToggle />
            <div className="hidden sm:block">
              <QuoteTriggerButton />
            </div>

            {/* Mobile Menu Trigger - Large as per request */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-12 w-12 rounded-full hover:bg-accent active:scale-95 transition-all"
                  aria-label="Menu"
                >
                  <Menu className="h-8 w-8 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto p-0 border-l border-border/40">
                <SheetHeader className="p-6 text-left border-b bg-muted/30">
                  <div className="mb-4">
                    <Logo />
                  </div>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="text-xs">
                    Industrial Power Solutions & Engineering
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col p-6 gap-2">
                  {/* Mobile Search */}
                  <div className="mb-6 relative">
                    <input
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                      placeholder="Type to search..."
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  </div>

                  {navLinks.map((link) => {
                    if (link.isMenu) {
                      return (
                        <Collapsible key={link.href} className="w-full border-b border-border/40 pb-2">
                          <CollapsibleTrigger className="flex w-full items-center justify-between text-xl font-medium text-foreground py-3 group">
                            {link.label}
                            <div className="p-1 rounded-full bg-muted group-data-[state=open]:bg-primary/20 transition-colors">
                              <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 space-y-2 mt-2">
                            {link.isMegaMenu ? (
                              // @ts-ignore
                              link.items.map((category: any, idx: number) => (
                                <Collapsible key={idx} className="w-full my-2">
                                  <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-semibold text-foreground/80 py-2">
                                    {category.title}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="pl-3 mt-1 space-y-2 border-l-2 border-border/50 ml-1.5">
                                    {/* @ts-ignore */}
                                    {category.items.map((item: string) => (
                                      <Link
                                        key={item}
                                        href={`/products/${item.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                                      >
                                        {item}
                                      </Link>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))
                            ) : (
                              // @ts-ignore
                              link.items?.map((item: any) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-3 text-base text-muted-foreground hover:text-primary border-b border-border/20 last:border-0"
                                >
                                  {item.label}
                                </Link>
                              ))
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }
                    return (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        isMobile
                      />
                    );
                  })}
                  <div className="mt-8 pt-6 border-t">
                    <Button asChild className="w-full h-12 text-lg font-bold shadow-xl" onClick={() => setMobileMenuOpen(false)}>
                      <span className="flex items-center gap-2" onClick={() => (window.location.href = '/contact')}>
                        Get a Quote <ChevronDown className="-rotate-90 h-5 w-5" />
                      </span>
                    </Button>
                    <div className="mt-6 flex justify-center gap-6 text-muted-foreground">
                      {/* Mobile Socials could go here */}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
