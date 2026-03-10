'use client';

import { Facebook, Instagram, Linkedin, Phone } from 'lucide-react';
import Link from 'next/link';

export function TopBar() {
    return (
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
    );
}
