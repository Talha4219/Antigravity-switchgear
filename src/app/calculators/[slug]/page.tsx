import { notFound } from 'next/navigation';
import { calculatorData, type CalculatorInfo } from '@/lib/calculators';
import AdvancedCalculatorWrapper from '../components/AdvancedCalculatorWrapper';
import connectDB from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { products } from '@/lib/product-data';

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return calculatorData.map((calculator) => ({
    slug: calculator.slug,
  }));
}

export async function generateMetadata({ params }: CalculatorPageProps) {
  const resolvedParams = await params;
  const calculator = calculatorData.find((c) => c.slug === resolvedParams.slug);

  if (!calculator) {
    return { title: 'Calculator Not Found' };
  }

  return {
    title: `${calculator.title} | EgSwitchgear Engineering Hub`,
    description: `Professional ${calculator.title} for industrial electrical engineering. IEC 61439 & NEC compliant estimations for switchgear and power systems.`,
    keywords: [`${calculator.title}`, 'Electrical Engineering', 'Switchgear Design', 'Industrial Power', 'EgSwitchgear'],
    alternates: {
      canonical: `https://egswitchgear.com/calculators/${calculator.slug}`,
    }
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const resolvedParams = await params;
  const currentIndex = calculatorData.findIndex((c) => c.slug === resolvedParams.slug);

  if (currentIndex === -1) {
    notFound();
  }

  const calculator = calculatorData[currentIndex];
  const CalculatorComponent = calculator.component;

  // Calculate Prev/Next for Quick Navigation
  const prevCalc = currentIndex > 0 ? {
    slug: calculatorData[currentIndex - 1].slug,
    title: calculatorData[currentIndex - 1].title
  } : undefined;

  const nextCalc = currentIndex < calculatorData.length - 1 ? {
    slug: calculatorData[currentIndex + 1].slug,
    title: calculatorData[currentIndex + 1].title
  } : undefined;

  // Fetch Latest Blogs for Sidebar
  let latestBlogs = [];
  try {
    await connectDB();
    const blogDocs = await BlogPost.find({ status: 'Published' })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    latestBlogs = blogDocs.map((doc: any) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      date: doc.date,
      imageId: doc.imageId
    }));
  } catch (error) {
    console.error("Failed to fetch sidebar blogs:", error);
  }

  // Determine Related Products based on Category
  const relatedProducts = Object.values(products)
    .filter(p => {
      if (calculator.category === 'System Analysis') return ['lt-panels', 'pfi-plant', 'sync-panels'].includes(p.slug);
      if (calculator.category === 'Power Distribution') return ['lt-panels', 'ats-amf-panels', 'mcc-panels'].includes(p.slug);
      if (calculator.category === 'Cabling & Containment') return ['cable-trays', 'cable-trunking', 'cable-ladders'].includes(p.slug);
      if (calculator.category === 'Lighting & Safety') return ['lighting-panels', 'distribution-boards', 'emergency-lighting-cbs'].includes(p.slug);
      if (calculator.category === 'Renewable Energy') return ['solar-panels', 'inverters', 'batteries'].includes(p.slug);
      return false;
    })
    .slice(0, 3)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      imageUrl: p.imageUrl
    }));

  return (
    <AdvancedCalculatorWrapper
      title={calculator.title}
      shortDescription={calculator.description as any}
      formula={calculator.formula}
      category={calculator.category}
      prevCalc={prevCalc}
      nextCalc={nextCalc}
      latestBlogs={latestBlogs}
      relatedProducts={relatedProducts}
      educationalContent={
        <div className="space-y-4">
          <p>This calculator is part of the <strong>EgSwitchgear Engineering Hub</strong>, a professional suite of tools designed to assist electrical engineers, panel builders, and contractors in designing safe and efficient power distribution systems.</p>
          <p>The logic follows international standards including <strong>IEC 61439</strong> for switchgear assemblies and <strong>NEC 2024</strong> for electrical installations. For mission-critical applications, always cross-reference these results with full-scale architectural engineering audits.</p>
        </div>
      }
    >
      <CalculatorComponent />
    </AdvancedCalculatorWrapper>
  );
}
