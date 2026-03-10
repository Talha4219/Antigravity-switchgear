import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Sign In | EgSwitchGear Portal',
    description: 'Authorized personnel login for the EgSwitchGear management portal.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
