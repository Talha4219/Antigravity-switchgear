'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Send } from 'lucide-react';

// --- Context ---
type QuoteContextType = {
    openQuoteDialog: (subject?: string) => void;
    closeQuoteDialog: () => void;
};

const QuoteContext = React.createContext<QuoteContextType | undefined>(undefined);

export function useQuoteDialog() {
    const context = React.useContext(QuoteContext);
    if (!context) {
        throw new Error('useQuoteDialog must be used within a QuoteDialogProvider');
    }
    return context;
}

// --- Schema ---
const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    company: z.string().min(2, 'Company name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// --- Provider Component ---
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [subject, setSubject] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            company: '',
            phone: '',
            email: '',
            message: '',
        },
    });

    // Reset form when dialog opens
    React.useEffect(() => {
        if (isOpen) {
            form.reset();
            if (subject) {
                form.setValue('message', `I am interested in: ${subject}`);
            }
        }
    }, [isOpen, subject, form]);

    const openQuoteDialog = (newSubject?: string) => {
        setSubject(newSubject || '');
        setIsOpen(true);
    };

    const closeQuoteDialog = () => {
        setIsOpen(false);
    };

    async function onSubmit(values: FormValues) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    type: 'quote',
                    subject: subject ? `Quote Request: ${subject}` : 'New Quote Request',
                }),
            });

            if (!response.ok) throw new Error('Failed to submit');

            toast({
                title: "Request Received!",
                description: "Our engineering team will contact you within 24 hours.",
            });
            form.reset();
            setIsOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <QuoteContext.Provider value={{ openQuoteDialog, closeQuoteDialog }}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary" />
                            Request a Quote
                        </DialogTitle>
                        <DialogDescription>
                            Get a customized proposal for your project requirements.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Good Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0300-1234567" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tech Industries Ltd." {...field} />
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Details (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please specify voltage ratings, dimensions, or specific requirements..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full text-lg font-bold" disabled={isLoading} size="lg">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Request <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-2">
                                We respect your privacy. Your information is never shared.
                            </p>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </QuoteContext.Provider>
    );
}
