import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Award, Users, Target } from 'lucide-react';

import { placeholderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'About Us | Evergreen Switchgear (EG Switchgear)',
  description: 'Evergreen Switchgear (EG Switchgear) is a leading switchgear manufacturer providing high-quality electrical switchgear solutions for industrial, commercial, and utility applications.',
};

export default function AboutPage() {
  const teamImage = placeholderImages.find(p => p.id === 'about-team');
  return (
    <>
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            About Evergreen Switchgear (EG Switchgear)
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            Your trusted partner for advanced switchgear manufacturing and power distribution solutions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 animate-in fade-in slide-in-from-left-6 duration-700">
              <h2 className="text-3xl font-headline font-semibold text-primary">Our Expertise</h2>
              <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Evergreen Switchgear (EG Switchgear) is a leading switchgear manufacturer providing high-quality electrical switchgear solutions for industrial, commercial, and utility applications. We specialize in the design and manufacturing of low voltage and medium voltage switchgear, ensuring safe, reliable, and efficient power distribution systems.
                </p>
                <p>
                  With advanced manufacturing facilities and strict quality control processes, EG Switchgear delivers customized switchgear panels, power control panels, and electrical distribution boards that comply with international safety and performance standards. Our products are engineered for durability, energy efficiency, and long-term operational reliability.
                </p>
                <p>
                  At Evergreen Switchgear, innovation, precision engineering, and customer satisfaction drive everything we do. Our experienced technical team works closely with clients to provide cost-effective switchgear solutions, on-time project delivery, and dependable after-sales support. We are committed to powering industries with reliable electrical switchgear manufacturing that supports sustainable growth and operational excellence.
                </p>
              </div>

              <div className="mt-10 border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl">
                <h3 className="text-xl font-headline font-semibold text-primary mb-2">Our Manufacturing Capability</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Evergreen Switchgear (EG Switchgear) stands apart with the largest CNC laser cutting machine in the region, enabling high-precision fabrication, faster turnaround times, and superior product consistency across all switchgear components.
                </p>
              </div>
              <div className="mt-12 grid sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-semibold">Our Mission</h3>
                    <p className="mt-1 text-muted-foreground">To provide superior power distribution solutions that ensure safety, reliability, and efficiency for our customers worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-semibold">Our People</h3>
                    <p className="mt-1 text-muted-foreground">Our team of dedicated engineers, technicians, and professionals are the backbone of our success and innovation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-6 duration-700 delay-200">
              {teamImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={teamImage.imageUrl}
                    alt="Evergreen Switchgear Team"
                    width={500}
                    height={600}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    data-ai-hint={teamImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-2">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">The principles that guide every decision we make.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Award className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Uncompromising standards in every component we manufacture.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Honest and transparent relationships with clients and partners.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Working together to achieve exceptional results.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Constantly seeking better ways to power the world.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
