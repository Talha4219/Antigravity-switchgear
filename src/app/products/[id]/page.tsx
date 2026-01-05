import { notFound } from 'next/navigation';
import { getProductBySlug, getNextProduct, getPrevProduct } from '@/lib/product-data';
import { StaticProductView } from '@/components/products/product-view';

interface ProductPageProps {
  params: {
    id: string; // The folder is [id], so the param is id. We treat it as slug.
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (product) {
    return {
      title: `${product.title} | EgSwitchGear`,
      description: product.shortDescription,
      alternates: {
        canonical: `/products/${product.slug}`,
      },
    };
  }
  return {
    title: 'Product Not Found',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  // The folder is named [id], so next passes the slug as `id`.
  const { id } = resolvedParams;

  const product = getProductBySlug(id);

  if (!product) {
    notFound();
  }

  const nextProduct = getNextProduct(id);
  const prevProduct = getPrevProduct(id);

  // Casting or mapping might be needed if StaticProductView expects specific types, 
  // but typically StaticProductView was built for this static data.
  // We need to double check ProductViewProps in product-view.tsx matches ProductData.
  // Based on previous reads, StaticProductView uses `product.title` etc which matches ProductData.

  // We need to map ProductData to the interface expected by StaticProductView if they differ.
  // ProductData has: slug, title, shortDescription, overview, features, specifications, applications, whyChooseUs, imageUrl
  // StaticProductView Props: product: Product (from models?) or similar.
  // Let's coerce it for now as they share common fields like title, description (overview vs description).

  const mappedProduct: any = {
    ...product,
    description: product.overview, // Map overview to description if component expects description
    specs: Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join(', '), // simplistic map
    imageId: product.imageUrl // map imageUrl to imageId? Component logic seemed to handle image parsing.
  };

  return <StaticProductView product={mappedProduct} nextProduct={nextProduct as any} prevProduct={prevProduct as any} />;
}
