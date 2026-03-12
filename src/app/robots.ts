import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/projects',
                '/cdn-cgi/l/email-protection',
                '/products/ht-switchgear-panels'
            ],
        },
        sitemap: 'https://www.egswitchgear.com/sitemap.xml',
    }
}
