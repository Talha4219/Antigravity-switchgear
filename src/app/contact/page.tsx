'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Building } from "lucide-react"
import Image from "next/image"
import { placeholderImages } from "@/lib/placeholder-images"
import Link from "next/link"
import * as motion from "framer-motion/client"
import AnimateOnScroll from "@/components/animations/animate-on-scroll"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const { toast } = useToast();
  const mapImage = placeholderImages.find(p => p.id === 'contact-map');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
      })
    }
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container px-4 py-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-headline font-bold tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto"
          >
            We're here to help. Reach out to our team for sales inquiries, technical support, or any other questions.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <AnimateOnScroll animation="fade-right" className="lg:col-span-2">
              <Card className="shadow-lg border-primary/10 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8">
                  <CardTitle className="font-headline text-2xl text-primary">Send us a Message</CardTitle>
                  <CardDescription className="text-base">Fill out the form below and our team will respond within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="name@example.com" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Ltd." {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Inquiry about Switchgear" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                className="min-h-[150px] bg-background"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="lg" className="w-full sm:w-auto font-bold">Send Message</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={0.2} className="space-y-8">
              <Card className="shadow-md border-primary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Our Headquarters</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Plot # 56, Street # 13,<br />
                        I-9/2, Islamabad,<br />
                        Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone & Fax</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Tel: +92 51 4864909<br />
                        Fax: +92 51 4864908<br />
                        WhatsApp: +92 321 9574003
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        <a href="mailto:admin@egswitchgear.com" className="hover:text-primary transition-colors">admin@egswitchgear.com</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {mapImage && (
                <Card className="overflow-hidden shadow-md border-primary/10">
                  <div className="relative h-64 w-full">
                    <Image
                      src={mapImage.imageUrl}
                      alt="Location Map"
                      fill
                      className="object-cover"
                      data-ai-hint={mapImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                  </div>
                  <CardContent className="p-4 bg-muted/50">
                    <Button variant="outline" className="w-full font-semibold" asChild>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                        Get Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
