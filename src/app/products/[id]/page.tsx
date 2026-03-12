import { notFound } from 'next/navigation';
import { getProductBySlug, getNextProduct, getPrevProduct, getCategoryBySlug, products } from '@/lib/product-data';
import { StaticProductView } from '@/components/products/product-view';
import ProductCatalog from '@/components/products/product-catalog';

interface ProductPageProps {
  params: Promise<{
    id: string; // The folder is [id], so the param is id. We treat it as slug.
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (product) {
    return {
      title: product.seoTitle || `${product.title} | EgSwitchGear`,
      description: product.shortDescription,
      alternates: {
        canonical: `https://www.egswitchgear.com/products/${product.slug}`,
      },
    };
  }

  const category = getCategoryBySlug(id);
  if (category) {
    return {
      title: `${category.group} | Industrial Switchgear Solutions`,
      description: `Explore our specialized range of ${category.group.toLowerCase()} systems. Precision-engineered solutions for industrial and commercial electrical infrastructure.`,
      alternates: {
        canonical: `https://www.egswitchgear.com/products/${id}`,
      },
    };
  }

  return {
    title: 'Product Not Found',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = getProductBySlug(id);

  if (product) {
    const nextProduct = getNextProduct(id);
    const prevProduct = getPrevProduct(id);

    const mappedProduct: any = {
      ...product,
      description: product.overview,
      specs: Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join(', '),
      imageId: product.imageUrl,
      relatedCalculators: product.relatedCalculators
    };

    return <StaticProductView product={mappedProduct} nextProduct={nextProduct as any} prevProduct={prevProduct as any} />;
  }

  const category = getCategoryBySlug(id);
  if (category) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-primary py-12 text-primary-foreground relative overflow-hidden">
          <div className="container relative z-10">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2 uppercase tracking-tight">
              {category.group}
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl text-sm font-medium">
              Browse our high-quality {category.group.toLowerCase()} range. All products are manufactured in our ISO certified CNC facility.
            </p>
          </div>
        </div>
        <div className="container py-12 px-4">
          <ProductCatalog categories={[category]} />
        </div>
      </div>
    );
  }

  notFound();
}
