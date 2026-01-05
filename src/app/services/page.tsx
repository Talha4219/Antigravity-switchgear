import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Zap, Wrench, ShieldCheck, Lightbulb, Package } from 'lucide-react';

export const metadata = {
  title: 'Services | SwitchGear Pro',
  description: 'Explore the expert services offered by SwitchGear Pro, from custom engineering to on-site support and maintenance.',
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
    </>
  );
}
