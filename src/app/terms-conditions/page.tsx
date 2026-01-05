
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Terms and Conditions | EgSwitchGear',
    description: 'Terms and Conditions for using EgSwitchGear website and services.',
    alternates: {
        canonical: '/terms-conditions',
    },
};

export default function TermsConditionsPage() {
    return (
        <div className="container py-16 md:py-24 max-w-4xl">
            <h1 className="text-4xl font-headline font-bold mb-8">Terms and Conditions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and EgSwitchGear (“we,” “us” or “our”), concerning your access to and use of the EgSwitchGear website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                    </p>

                    <h3>Intellectual Property Rights</h3>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                    </p>

                    <h3>User Representations</h3>
                    <p>
                        By using the Site, you represent and warrant that:
                    </p>
                    <ul>
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                    </ul>

                    <h3>Products and Services</h3>
                    <p>
                        All products and services available on the Site are subject to availability. We reserve the right to discontinue any product at any time for any reason. Prices for all products are subject to change.
                    </p>

                    <h3>Limitation of Liability</h3>
                    <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                    </p>

                    <h3>Contact Us</h3>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <br />
                        <strong>EgSwitchGear</strong><br />
                        Email: info@egswitchgear.com
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
