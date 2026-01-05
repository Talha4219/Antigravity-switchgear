import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import BlogPost from '@/models/BlogPost';
import Category from '@/models/Category';
import Certification from '@/models/Certification';
import { industries as industriesData } from '@/lib/industry-data';

// Static services data for search
const servicesData = [
    { title: "Custom Engineering & Design", description: "Tailored switchgear solutions designed to meet your specific project requirements.", slug: "custom-engineering" },
    { title: "Installation & Commissioning", description: "Professional installation and commissioning services for your systems.", slug: "installation" },
    { title: "Maintenance & Support", description: "Comprehensive maintenance plans and on-demand support for electrical infrastructure.", slug: "maintenance" },
    { title: "System Modernization & Retrofitting", description: "Upgrade your existing switchgear with the latest technology.", slug: "modernization" },
    { title: "Safety & Compliance Audits", description: "Ensure your facilities meet the latest safety standards.", slug: "safety-audits" },
    { title: "Spare Parts & Logistics", description: "Reliable and timely supply of genuine spare parts.", slug: "spare-parts" }
];

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    try {
        await dbConnect();

        const regex = new RegExp(query, 'i');

        // Search Products
        const products = await Product.find({
            $or: [
                { title: regex },
                { description: regex },
                { specs: regex }
            ]
        }).limit(5).select('title slug category imageId');

        // Search Blogs
        const blogs = await BlogPost.find({
            $or: [
                { title: regex },
                { excerpt: regex },
                { content: regex }
            ]
        }).limit(5).select('title slug imageId date');

        // Search Categories
        const categories = await Category.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        }).limit(3).select('name slug');

        // Search Certifications
        const certifications = await Certification.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        }).limit(3).select('name description');

        // Search Industries (Static)
        const matchedIndustries = Object.values(industriesData)
            .filter(ind => regex.test(ind.title) || regex.test(ind.shortDescription) || ind.keywords.some(k => regex.test(k)))
            .slice(0, 3);

        // Search Services (Static)
        const matchedServices = servicesData
            .filter(ser => regex.test(ser.title) || regex.test(ser.description))
            .slice(0, 3);

        // Search Pages (Static)
        const pagesData = [
            { title: "About Us", description: "Learn about our history, mission, and values in the switchgear industry.", url: "/about", keywords: ["story", "mission", "values", "team"] },
            { title: "Why Choose Us", description: "What makes EgSwitchGear the preferred choice for industrial electrical solutions.", url: "/why-choose-us", keywords: ["quality", "reliability", "expertise", "advantage"] },
            { title: "Contact Us", description: "Get in touch with our expert team for quotes and technical support.", url: "/contact", keywords: ["location", "phone", "email", "support", "sales"] }
        ];

        const matchedPages = pagesData.filter(page =>
            regex.test(page.title) || regex.test(page.description) || page.keywords.some(k => regex.test(k))
        );

        const results = [
            ...products.map((p: any) => ({
                id: p._id,
                title: p.title,
                slug: p.slug,
                type: 'product',
                url: `/products/${p.slug}`,
                category: p.category
            })),
            ...blogs.map((b: any) => ({
                id: b._id,
                title: b.title,
                slug: b.slug,
                type: 'blog',
                url: `/blog/${b.slug}`,
                date: b.date
            })),
            ...categories.map((c: any) => ({
                id: c._id,
                title: c.name,
                slug: c.slug,
                type: 'category',
                url: `/products?category=${c.slug}`
            })),
            ...certifications.map((cert: any) => ({
                id: cert._id,
                title: cert.name,
                type: 'certification',
                url: `/certifications`
            })),
            ...matchedIndustries.map((ind: any) => ({
                id: `ind-${ind.slug}`,
                title: ind.title,
                type: 'industry',
                url: `/industries/${ind.slug}`
            })),
            ...matchedServices.map((ser: any) => ({
                id: `ser-${ser.slug}`,
                title: ser.title,
                type: 'service',
                url: `/services`
            })),
            ...matchedPages.map((page: any, idx: number) => ({
                id: `page-${idx}`,
                title: page.title,
                type: 'page',
                url: page.url
            }))
        ];

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
