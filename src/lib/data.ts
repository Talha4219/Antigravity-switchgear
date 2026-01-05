
export interface Product {
  id: string;
  name: string;
  description: string;
  specs: string;
  applications: string[];
  imageId: string;
};

export interface BlogPost {
  id:string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageId: string;
  status: 'Published' | 'Draft';
};

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
};

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  description: string;
  imageId: string;
};

// DATA MIGRATED TO MONGODB
// The following static data and helper functions are deprecated and should not be used.
// Please use the API routes or direct DB connections to fetch data.

// Mock empty arrays to prevent build errors if referenced
const products: Product[] = [];
const blogPosts: BlogPost[] = [];
const specialOffers: Offer[] = [];
const certifications: Certification[] = [];

export const getProducts = () => products;
export const getFeaturedProducts = () => products.slice(0, 3);
export const getProductById = (id: string) => products.find(p => p.id === id);

export const getBlogPosts = () => blogPosts;
export const getRecentPosts = () => blogPosts.filter(p => p.status === 'Published').slice(0, 2);
export const getPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);

export const getSpecialOffers = () => specialOffers;

export const getCertifications = () => certifications;

export const seedData = async () => {
  console.log('Seeding data is no longer supported via this function. Please use the API routes.');
};
