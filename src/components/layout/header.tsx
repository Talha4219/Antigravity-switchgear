'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useQuoteDialog } from '@/components/conversion/quote-dialog-provider';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Logo from './logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavSearch } from './nav-search';
import { TopBar } from './top-bar';
import { MobileNav } from './mobile-nav';
import { navLinks, getLinkHref } from '@/lib/nav-data';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openQuoteDialog } = useQuoteDialog();

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
    setHoveredLink(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setHoveredLink(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <TopBar />

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/80 dark:bg-[#0B1221]/80 backdrop-blur-xl shadow-2xl shadow-primary/5 py-1 border-b border-primary/10"
            : "bg-white dark:bg-[#0B1221] py-4 border-b border-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex-shrink-0 relative group">
            <Logo />
            <div className="absolute -inset-2 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </div>

          <nav className="hidden xl:flex items-center justify-center flex-1">
            <div className="bg-muted/30 dark:bg-white/5 px-2 py-1.5 rounded-full border border-border/40 backdrop-blur-md flex items-center gap-0.5">
              {navLinks.map((link: any) => {
                const isActive = pathname === link.href || (link.isMenu && pathname.startsWith(link.href));

                if (link.isMenu) {
                  return (
                    <DropdownMenu
                      key={link.href}
                      open={openMenu === link.label}
                      onOpenChange={(open) => !open && setOpenMenu(null)}
                    >
                      <DropdownMenuTrigger
                        className={cn(
                          "relative px-4 py-2 text-[13px] font-bold transition-all duration-300 rounded-full flex items-center gap-1.5 focus:outline-none",
                          isActive ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                        )}
                        onMouseEnter={() => handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.label}
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", hoveredLink === link.label && "rotate-180")} />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="center"
                        className="w-[100vw] lg:w-[1000px] p-0 border-primary/20 bg-white/95 dark:bg-[#0B1221]/95 backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-300 rounded-3xl overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="grid grid-cols-12 min-h-[400px] lg:h-[550px]">
                          <div className="col-span-3 bg-primary/5 p-10 border-r border-primary/10 flex flex-col justify-between">
                            <div>
                              <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
                                <ExternalLink size={24} />
                              </div>
                              <h3 className="font-headline font-black text-3xl text-primary leading-tight mb-4">{link.branding?.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                {link.branding?.description}
                              </p>
                            </div>
                            <Button asChild className="rounded-xl h-12 font-bold group">
                              <Link href={link.branding?.actionLink || '#'} title={link.branding?.actionText} className="flex items-center gap-2">
                                {link.branding?.actionText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </div>

                          <div className="col-span-9 p-8">
                            <ScrollArea className="h-full pr-4">
                              <div className="grid grid-cols-3 gap-8">
                                {link.items?.map((category: any) => (
                                  <div key={category.title} className="group/cat">
                                    <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-4 opacity-70 group-hover/cat:opacity-100 transition-opacity">
                                      <span className="h-[2px] w-4 bg-primary rounded-full" />
                                      {category.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {category.items.map((item: string) => (
                                        <li key={item}>
                                          <Link
                                            href={getLinkHref(item, link.href)}
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
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.title}
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

            <MobileNav
              isOpen={isMobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
              navLinks={navLinks}
              getLinkHref={getLinkHref}
              openQuoteDialog={openQuoteDialog}
            />
          </div>
        </div>
      </header>
    </>
  );
}
