'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-white">S</div>
            Sellasist<span className="text-primary font-light">Pro</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-foreground/80 hover:text-primary transition-colors">
            All Products
          </Link>
          <Link href="/products?category=cargo-control" className="text-foreground/80 hover:text-primary transition-colors">
            Cargo Control
          </Link>
          <Link href="/products?category=parts" className="text-foreground/80 hover:text-primary transition-colors">
            Parts
          </Link>
        </div>

        {/* Search & Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-slate-50 border border-border text-slate-900 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow placeholder:text-slate-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <button 
            onClick={toggleCart}
            className="relative p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems() > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                {totalItems()}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}