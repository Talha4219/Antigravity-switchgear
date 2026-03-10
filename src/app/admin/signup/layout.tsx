import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Sign Up | EgSwitchGear Portal',
    description: 'Registration for authorized administrative personnel.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
