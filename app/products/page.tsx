import { getProducts, getCategories } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allProducts = await getProducts();
  const categories = await getCategories();

  // Mock filtering
  const products = category 
    ? allProducts.filter(p => p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === category)
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-border pb-2">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products" 
                  className={`text-sm ${!category ? 'text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All Categories
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/products?category=${cat.slug}`} 
                    className={`text-sm ${category === cat.slug ? 'text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-border pb-2">Price Range</h2>
            <div className="space-y-4">
              {/* Mock Price Filter UI */}
              <input type="range" className="w-full accent-primary" />
              <div className="flex justify-between text-sm text-slate-600">
                <span>0 zł</span>
                <span>500+ zł</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-border pb-2">Availability</h2>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
              <input type="checkbox" className="rounded border-border bg-slate-50 text-primary focus:ring-primary" />
              In Stock Only
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {category ? categories.find(c => c.slug === category)?.name : 'All Products'}
            </h1>
            <span className="text-sm text-slate-600">{products.length} Products</span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">{product.category}</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{product.title}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">{product.price.toFixed(2)} zł</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.stock_level > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock_level > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}