import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact for Switchgear Quotes | EgSwitchGear',
    description: 'Get in touch with EgSwitchGear for technical consultation, custom switchgear quotes, and 24/7 industrial support. Visit our facility or contact us online.',
    keywords: ['contact EgSwitchGear', 'electrical engineering support', 'switchgear quote Pakistan', 'technical consultation', 'Evergreen Switchgear address'],
    alternates: {
        canonical: 'https://www.egswitchgear.com/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
