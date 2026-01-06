import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Cta from '@/components/layout/cta';
import { ThemeProvider } from '@/components/theme-provider';
import NextAuthSessionProvider from '@/components/providers/session-provider';
import { QuoteDialogProvider } from '@/components/conversion/quote-dialog-provider';
import { WhatsAppButton } from '@/components/conversion/whatsapp-button';
import MotionShell from '@/components/animations/motion-shell';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://egswitchgear.com'), // Replace with actual domain in production
  title: {
    default: 'EgSwitchGear | High Quality Industrial Switchgear',
    template: '%s | EgSwitchGear',
  },
  description: 'Leading manufacturer of high-quality switchgear products, HT/LT Panels, VCB, ACB, and power distribution solutions for industrial applications. Ensuring electrical safety and reliability.',
  keywords: [
    // Core Identity
    'Switchgear', 'EgSwitchgear', 'Electrical Safety', 'Power Distribution',
    // Core / High-Intent Keywords
    'industrial switchgear', 'switchgear products', 'switchgear supplier', 'switchgear manufacturer',
    'switchgear distributor', 'custom switchgear solutions', 'switchgear systems', 'switchgear equipment',
    // By Voltage Level
    'low voltage switchgear', 'medium voltage switchgear', 'high voltage switchgear',
    'LV switchgear panels', 'MV switchgear cabinets', 'HV switchgear solutions',
    'ultra high voltage switchgear', '11kV switchgear', '33kV switchgear', '66kV switchgear',
    // By Type / Technology
    'gas insulated switchgear (GIS)', 'air insulated switchgear (AIS)', 'vacuum switchgear',
    'oil switchgear', 'hybrid switchgear systems', 'modular switchgear', 'smart switchgear',
    'metal-enclosed switchgear', 'outdoor switchgear', 'indoor switchgear',
    // Components
    'circuit breaker switchgear', 'busbar switchgear', 'protection relay switchgear',
    'disconnect switch switchgear', 'isolator switchgear', 'fused switchgear',
    // Long-Tail / Specialist
    'switchgear installation services', 'switchgear maintenance and testing',
    'switchgear repair near me', 'switchgear replacement parts', 'switchgear for power distribution',
    'switchgear for industrial applications', 'switchgear for commercial buildings',
    'intelligent switchgear monitoring', 'switchgear safety standards', 'IEC switchgear specifications',
    'switchgear electrical design', 'switchgear cost and pricing guide',
    // Product Specifics from Mega Menu
    'LT Panels', 'HT Panels', 'VCB', 'ACB', 'PFI Plant', 'ATS Panel', 'AMF Panel',
    'Cable Trays', 'Industrial Automation', 'Solar Systems',
    'Pakistan', 'Islamabad', 'Rawalpindi'
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://egswitchgear.com',
    title: 'EgSwitchGear | Industrial Switchgear Solutions',
    description: 'Reliable and safe power distribution with top-tier HT/LT panels and switchgear.',
    siteName: 'EgSwitchGear',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EgSwitchGear | Industrial Switchgear Solutions',
    description: 'Reliable and safe power distribution with top-tier HT/LT panels and switchgear.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3210886528292703"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >


          <NextAuthSessionProvider>
            <QuoteDialogProvider>
              <div className="relative flex min-h-dvh flex-col bg-background">
                <Header />
                <main className="flex-1">
                  <MotionShell>{children}</MotionShell>
                </main>
                <Cta />
                <Footer />
                <WhatsAppButton />
              </div>
              <Toaster />
            </QuoteDialogProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
