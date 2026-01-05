
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Privacy Policy | EgSwitchGear',
    description: 'Privacy Policy for EgSwitchGear. Learn how we collect, use, and protect your personal information.',
    alternates: {
        canonical: '/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container py-16 md:py-24 max-w-4xl">
            <h1 className="text-4xl font-headline font-bold mb-8">Privacy Policy</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>
                        At EgSwitchGear, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                    </p>

                    <h3>Information We Collect</h3>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                    </p>

                    <h3>Use of Your Information</h3>
                    <p>
                        We use the information we collect or receive:
                    </p>
                    <ul>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you marketing and promotional communications.</li>
                        <li>To fulfill and manage your orders.</li>
                        <li>To respond to user inquiries/offer support to users.</li>
                    </ul>

                    <h3>Disclosure of Your Information</h3>
                    <p>
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                    </p>
                    <ul>
                        <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                    </ul>

                    <h3>Security of Your Information</h3>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>

                    <h3>Contact Us</h3>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at: <br />
                        <strong>EgSwitchGear</strong><br />
                        Email: info@egswitchgear.com
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
