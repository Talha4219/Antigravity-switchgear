'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Menu, ChevronDown, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface MobileNavProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    navLinks: any[];
    getLinkHref: (label: string, menuHref: string) => string;
    openQuoteDialog: () => void;
}

export function MobileNav({ isOpen, onOpenChange, navLinks, getLinkHref, openQuoteDialog }: MobileNavProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                                            {link.items?.map((category: any) => (
                                                <div key={category.title} className="mt-4 first:mt-2">
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 mb-3">{category.title}</h5>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {category.items.map((item: string) => (
                                                            <Link
                                                                key={item}
                                                                href={getLinkHref(item, link.href)}
                                                                title={`View details for ${item}`}
                                                                onClick={() => onOpenChange(false)}
                                                                className="flex items-center gap-3 py-2 text-base font-bold text-muted-foreground hover:text-primary transition-colors"
                                                            >
                                                                <div className="h-1.5 w-1.5 rounded-full bg-border" />
                                                                {item}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                );
                            }
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    title={link.title}
                                    onClick={() => onOpenChange(false)}
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
                                    <MapPin size={18} /> <span className="text-sm">Plot # 56, Street # 13, Sector I-9/2, Islamabad</span>
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
                            onOpenChange(false);
                            openQuoteDialog();
                        }}
                    >
                        Request a Quote
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
