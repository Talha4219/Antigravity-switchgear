
import { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import BlogPost from '@/models/BlogPost';
import { getProductList } from '@/lib/product-data';

import { getIndustryList } from '@/lib/industry-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.egswitchgear.com';

    // 1. Static Routes
    const routes = [
        '',
        '/products',
        '/services',
        '/calculators',
        '/about',
        '/contact',
        '/certifications',
        '/blog',
        '/privacy-policy',
        '/terms-conditions',
        '/why-choose-us',
        '/resources',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Static Product Pages (From product-data.ts)
    const staticProducts = getProductList().map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 3. Industry Pages (From industry-data.ts)
    const industryPages = getIndustryList().map((ind) => ({
        url: `${baseUrl}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
    }));

    // 4. Dynamic Data (DB Products & Blog Posts)
    let productUrls = [];
    let blogUrls = [];

    try {
        await connectDB();
        const products = await Product.find({}, '_id updatedAt').lean();
        const blogPosts = await BlogPost.find({ status: 'Published' }, 'slug date').lean();

        productUrls = products.map((product) => ({
            url: `${baseUrl}/products/${product._id}`,
            lastModified: product.updatedAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        blogUrls = blogPosts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap Error (DB connection failed):', error);
        // Continue with only static routes
    }

    return [...routes, ...staticProducts, ...industryPages, ...productUrls, ...blogUrls];
}

