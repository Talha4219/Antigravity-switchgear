import { allCategories, normalizeSlug } from '@/lib/product-data';

export const productCategories = allCategories.map(cat => ({
    title: cat.group,
    items: cat.items
}));

export const navLinks = [
    {
        href: '/products',
        label: 'Products',
        title: 'Explore Our Full Range of Switchgear Products',
        isMenu: true,
        isMegaMenu: true,
        branding: {
            title: 'Precision Engineering',
            description: "Every unit is a masterpiece of safety and reliability, fabricated using Pakistan's largest CNC laser cutting technology.",
            actionText: 'View All Categories',
            actionLink: '/products'
        },
        items: productCategories,
    },
    {
        href: '/industries',
        label: 'Industries',
        title: 'Precision Power Solutions for Diverse Industries',
        isMenu: true,
        isMegaMenu: true,
        branding: {
            title: 'Industry Expertise',
            description: 'Tailored electrical solutions for varied sectors, ensuring operational excellence and safety across the board.',
            actionText: 'Explore Industries',
            actionLink: '/industries'
        },
        items: [
            {
                title: 'Core Sectors',
                items: [
                    'Factories & Manufacturing',
                    'Commercial Buildings',
                    'Water Treatment',
                    'Hospitals',
                    'Solar Projects'
                ]
            }
        ]
    },
    { href: '/services', label: 'Services', title: 'Professional Electrical Services and Maintenance' },
    { href: '/calculators', label: 'Calculators', title: 'Advanced Electrical Load and Power Calculators' },
    {
        href: '/about',
        label: 'Company',
        title: 'Learn More About Evergreen Switchgear',
        isMenu: true,
        isMegaMenu: true,
        branding: {
            title: 'Our Journey',
            description: 'Discover the legacy of Evergreen Switchgear, our commitment to quality, and the people behind our success.',
            actionText: 'About Evergreen',
            actionLink: '/about'
        },
        items: [
            {
                title: 'Organization',
                items: [
                    'About Us',
                    'Why Choose Us',
                    'Certifications',
                    'Manufacturing Facility'
                ]
            },
            {
                title: 'Resources',
                items: [
                    'Knowledge Hub',
                    'Blog',
                    'Our Projects',
                ]
            }
        ]
    },
    { href: '/contact', label: 'Contact', title: 'Get in Touch with Our Engineering Team' },
];

export const getLinkHref = (label: string, menuHref: string) => {
    if (menuHref === '/products') return `/products/${normalizeSlug(label)}`;

    const companyLinks: Record<string, string> = {
        'About Us': '/about',
        'Why Choose Us': '/why-choose-us',
        'Manufacturing Facility': '/manufacturing',
        'Knowledge Hub': '/resources',
        'Certifications': '/certifications',
        'Our Projects': '/projects',
        'Blog': '/blog'
    };

    const industryLinks: Record<string, string> = {
        'Factories & Manufacturing': '/industries/factories-manufacturing',
        'Commercial Buildings': '/industries/commercial-buildings',
        'Water Treatment': '/industries/water-treatment',
        'Hospitals': '/industries/hospitals',
        'Solar Projects': '/industries/solar-projects'
    };

    return companyLinks[label] || industryLinks[label] || '#';
};
