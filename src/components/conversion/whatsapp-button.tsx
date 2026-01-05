'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function WhatsAppButton() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    const phoneNumber = '923001234567';
    const message = 'Hello I am interested in EG Switchgear products.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Button
                asChild
                size="icon"
                className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
            >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                    <MessageCircle className="h-8 w-8 text-white fill-current" />
                </a>
            </Button>
        </div>
    );
}
