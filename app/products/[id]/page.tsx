import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';
import { Package, Shield, Settings } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
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
      <div className="text-sm text-slate-400 mb-8 flex items-center gap-2">
        <span>Home</span>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span className="text-primary">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="relative aspect-square w-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
              product.stock_level > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${product.stock_level > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
              {product.stock_level > 0 ? `${product.stock_level} In Stock` : 'Out of Stock'}
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-10">
            <AddToCartButton product={product} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <p className="font-bold text-white text-sm">Free Shipping</p>
                <p className="text-xs text-slate-400">On orders over $200</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <p className="font-bold text-white text-sm">2 Year Warranty</p>
                <p className="text-xs text-slate-400">Full protection</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="mt-16 pt-16 border-t border-border">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">Technical Specifications</h2>
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
            <div key={i} className="flex justify-between py-3 border-b border-slate-800">
              <span className="text-slate-400">{spec.label}</span>
              <span className="font-medium text-white text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
