import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { getProducts, getCategories } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  
  const bestsellers = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=2000"
            alt="Industrial truck and transport"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Professional <br />
              <span className="text-primary">Transport & Cargo</span> <br />
              Equipment
            </h1>
            <p className="text-lg text-slate-300">
              High-performance parts, cargo control, and vehicle accessories for professionals. Certified quality built to withstand the toughest conditions.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link 
                href="/products" 
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                Shop All Inventory <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">Certified Quality</h3>
              <p className="text-sm text-slate-400">All products meet ISO standards</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">Fast Dispatch</h3>
              <p className="text-sm text-slate-400">Same day shipping on orders before 2PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">24/7 Support</h3>
              <p className="text-sm text-slate-400">Technical assistance around the clock</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-slate-300 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Explore category <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Bestselling Parts</h2>
          <Link href="/products" className="text-primary hover:text-primary-hover font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-primary/50 transition-colors">
              <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
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
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.title}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.stock_level > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {product.stock_level > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
