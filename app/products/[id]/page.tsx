import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/ProductGallery';
import { Package, Shield, Settings } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await getProducts();
  // Limit static generation to first 50 items to prevent huge build times and API rate limiting
  return products.slice(0, 50).map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-400 mb-8 flex items-center gap-2">
        <span>Home</span>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span className="text-primary">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Product Image Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images && product.images.length > 0 ? product.images : [product.image_url]} title={product.title} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <span className="text-3xl font-bold text-slate-900">{product.price.toFixed(2)} zł</span>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
              product.stock_level > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${product.stock_level > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              {product.stock_level > 0 ? `${product.stock_level} In Stock` : 'Out of Stock'}
            </div>
          </div>

          <div 
            className="text-slate-600 leading-relaxed mb-8 max-w-none [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_strong]:font-bold [&_b]:font-bold"
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          />

          {/* Add to Cart Component (Client Side) */}
          <div className="mb-10">
            <AddToCartButton product={product} />
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-border">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <p className="font-bold text-slate-900 text-sm">Free Shipping</p>
                <p className="text-xs text-slate-600">On orders over 200 zł</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-border">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <p className="font-bold text-slate-900 text-sm">2 Year Warranty</p>
                <p className="text-xs text-slate-600">Full protection</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Technical Specifications Tab (Mock) */}
      <div className="mt-16 pt-16 border-t border-border">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-900">Technical Specifications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {[
            { label: 'Manufacturer', value: 'SellasistPro Industries' },
            { label: 'Category', value: product.category },
            { label: 'Item Weight', value: 'Varies by variant' },
            { label: 'Material', value: 'Heavy Duty Alloy / Industrial Polyester' },
            { label: 'Certification', value: 'ISO 9001:2015, DOT Compliant' },
            { label: 'Country of Origin', value: 'Germany' },
          ].map((spec, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">{spec.label}</span>
              <span className="font-medium text-slate-900 text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}