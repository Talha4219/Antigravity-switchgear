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
import { LazyMotion, domAnimation } from 'framer-motion';
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
  metadataBase: new URL('https://www.egswitchgear.com'),
  title: {
    default: 'Evergreen Switchgear | Leading Electrical Solutions in Pakistan',
    template: '%s | Evergreen Switchgear',
  },
  description: 'Expert manufacturers of premium LV/MV switchgear, control panels, and industrial electrical solutions. ISO 9001:2015 certified electrical engineering in Pakistan.',
  keywords: [
    'Evergreen Switchgear', 'EG Switchgear', 'Switchgear Pakistan', 'Electrical Safety', 'Power Distribution',
    'industrial switchgear', 'switchgear manufacturer', 'custom switchgear solutions',
    'LV switchgear panels', 'MV switchgear cabinets', '11kV switchgear', '33kV switchgear',
    'gas insulated switchgear GIS', 'air insulated switchgear AIS', 'vacuum switchgear',
    'circuit breaker switchgear', 'busbar switchgear', 'PFI Plant Pakistan', 'ATS AMF Panels',
    'electrical panel manufacturer Islamabad', 'IEC compliant panels',
    'electric cable capacity calculator', 'cable ratings calculator', 'domestic cable size calculator',
    'LT Panels', 'HT Panels', 'VCB', 'ACB', 'Cable Trays', 'Industrial Automation', 'Solar Systems',
    'switchgear rating calculation', 'electrical switchgear cost estimate', 'industrial switchgear solutions',
    'electric cable capacity calculator', 'cable ratings calculator', 'iec 61439 busbar size',
    'busbar calculator', 'switchgear services', 'domestic cable size calculator', 'medium voltage power solutions',
    'busbar size for 6300a', 'cbs central battery system', 'bus coupler panel', 'pfi plant', 'arc flash calculator',
    'copper busbar size', 'iec 61439-1', 'iec 61439-2', 'switchgear solutions', 'vfd control panel',
    'Pakistan', 'Islamabad', 'eg switch'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.egswitchgear.com',
    siteName: 'Evergreen Switchgear',
    title: 'Evergreen Switchgear | Leading Electrical Solutions in Pakistan',
    description: 'Expert manufacturers of premium LV/MV switchgear, control panels, and industrial electrical solutions. ISO 9001:2015 certified.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Evergreen Switchgear Industrial Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evergreen Switchgear | Precision Electrical Engineering',
    description: 'High-quality electrical switchgear and industrial solutions tailored for safety and reliability.',
    images: ['/opengraph-image.png'],
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
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N543VB3RVL" strategy="afterInteractive" />
        <Script id="google-gtag" strategy="afterInteractive">
          {`\n            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', 'G-N543VB3RVL');\n          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vtgpiu3dy1");
          `}
        </Script>
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
            <LazyMotion features={domAnimation}>
              <QuoteDialogProvider>
                <div className="relative flex min-h-dvh flex-col bg-background">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Cta />
                  <Footer />
                  <WhatsAppButton />
                </div>
                <Toaster />
              </QuoteDialogProvider>
            </LazyMotion>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
