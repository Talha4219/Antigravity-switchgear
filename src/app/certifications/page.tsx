import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import connectDB from '@/lib/db';
import Certification from '@/models/Certification';

export const metadata = {
  title: 'Certifications & Compliance | SwitchGear Pro',
  description: 'View our certifications and compliance standards that demonstrate our commitment to quality, safety, and environmental responsibility.',
};

export const revalidate = 60;

export default async function CertificationsPage() {
  await connectDB();
  const certifications = (await Certification.find({}).lean()).map((p: any) => ({ ...p, id: p._id.toString() }));

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Certifications &amp; Compliance</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Our commitment to global standards of quality, safety, and environmental management.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => {
              const certImage = placeholderImages.find((p) => p.id === cert.imageId);
              return (
                <Card key={cert.id} className="text-center">
                  <CardHeader>
                    {certImage && (
                        <div className="relative h-24 w-24 mx-auto mb-4">
                            <Image
                                src={certImage.imageUrl}
                                alt={`${cert.name} Logo`}
                                fill
                                className="object-contain"
                                data-ai-hint={certImage.imageHint}
                            />
                        </div>
                    )}
                    <CardTitle className="font-headline">{cert.name}</CardTitle>
                    <CardDescription>{cert.issuingBody}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
