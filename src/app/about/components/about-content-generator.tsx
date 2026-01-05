'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAboutUsAction } from '../actions';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  companyName: z.string().default('SwitchGear Pro'),
  companyMission: z.string().min(10, 'Please provide more detail.').default('To provide superior power distribution solutions that ensure safety, reliability, and efficiency.'),
  companyHistory: z.string().min(10, 'Please provide more detail.').default('Founded in 1985, we have grown from a small workshop to an industry leader in switchgear manufacturing.'),
  companyValues: z.string().min(10, 'Please provide more detail.').default('Quality, Integrity, Innovation, Customer Focus.'),
  companyExpertise: z.string().min(10, 'Please provide more detail.').default('Specializing in low, medium, and high voltage switchgear, protective relays, and substation automation.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AboutContentGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({}),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedContent('');

    const result = await generateAboutUsAction(values);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Content',
        description: result.error,
      });
    } else if(result.data) {
      setGeneratedContent(result.data.aboutUsContent);
      toast({
        title: 'Content Generated',
        description: 'The "About Us" content has been successfully generated.',
      });
    }
    
    setIsLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">Generate Expertise Content</CardTitle>
            </div>
            <CardDescription>
              Use our AI tool to craft a compelling narrative about our company. Fill in the details below and let AI elaborate on our expertise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyExpertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Expertise</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Specializing in low, medium, and high voltage switchgear..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your company's core areas of expertise.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* Hidden fields for other required data */}
                <input type="hidden" {...form.register('companyName')} />
                <input type="hidden" {...form.register('companyMission')} />
                <input type="hidden" {...form.register('companyHistory')} />
                <input type="hidden" {...form.register('companyValues')} />
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Content'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-background p-8 rounded-lg border shadow-sm min-h-[300px]">
        <h3 className="font-headline text-primary">Generated Content</h3>
        {isLoading && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <span>AI is crafting your content...</span>
          </div>
        )}
        {generatedContent ? (
            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
        ) : !isLoading && (
            <p className="text-muted-foreground">The generated "About Us" content will appear here.</p>
        )}
      </div>
    </div>
  );
}
