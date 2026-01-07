import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Zap, Wrench, ShieldCheck, Lightbulb, Package, Factory, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Engineering Services | Evergreen Switchgear (EG Switchgear)',
  description: 'Explore the expert electrical services offered by Evergreen Switchgear, from custom CNC engineering to on-site support and maintenance.',
};

const services = [
  {
    title: "Custom Engineering & Design",
    description: "Tailored switchgear solutions designed to meet your specific project requirements, ensuring optimal performance and integration.",
    icon: Cog,
  },
  {
    title: "Installation & Commissioning",
    description: "Our expert technicians provide professional installation and commissioning services to guarantee your systems are up and running correctly from day one.",
    icon: Wrench,
  },
  {
    title: "Maintenance & Support",
    description: "Comprehensive maintenance plans and on-demand support to maximize the lifespan and reliability of your electrical infrastructure.",
    icon: Zap,
  },
  {
    title: "System Modernization & Retrofitting",
    description: "Upgrade your existing switchgear with the latest technology to enhance safety, improve efficiency, and extend service life.",
    icon: Lightbulb,
  },
  {
    title: "Safety & Compliance Audits",
    description: "Ensure your facilities meet the latest safety standards with our thorough compliance audits and arc flash risk assessments.",
    icon: ShieldCheck,
  },
  {
    title: "Spare Parts & Logistics",
    description: "Reliable and timely supply of genuine spare parts to minimize downtime and keep your operations running smoothly.",
    icon: Package,
  }
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Providing end-to-end solutions to power your success, from design and installation to long-term maintenance and support.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title}>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto bg-card rounded-[2rem] p-8 md:p-12 border border-primary/10 shadow-xl flex flex-col md:flex-row items-center gap-10">
            <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Factory className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">Advanced Manufacturing Capabilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our services are backed by the **largest CNC laser cutting facility in the region**, allowing us to offer unprecedented precision in custom switchgear fabrication and rapid project delivery.
              </p>
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white group">
                <Link href="/manufacturing" className="flex items-center gap-2">
                  View Our Facility <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
