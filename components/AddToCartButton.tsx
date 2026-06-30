'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/api';

export default function AddToCartButton({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity,
      variant: selectedVariant || undefined,
    });
    
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      toggleCart(); // open cart
    }, 600);
  };

  const isOutOfStock = product.stock_level <= 0;

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Variant</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedVariant === variant 
                    ? 'bg-primary text-white border-2 border-primary' 
                    : 'bg-slate-50 text-slate-700 border-2 border-transparent hover:bg-slate-100'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-4">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
          <input 
            type="number" 
            min="1" 
            max={product.stock_level}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 bg-white border border-border rounded-xl px-3 py-3 text-center text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isOutOfStock}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          disabled={isOutOfStock || added}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
            isOutOfStock 
              ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-border' 
              : added
                ? 'bg-green-500 text-white'
                : 'bg-primary hover:bg-primary-hover text-white hover:shadow-lg hover:shadow-primary/25'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : added ? (
            <>
              <Check className="w-5 h-5" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}