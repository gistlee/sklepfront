'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

export default function CartSidebar() {
  const { isOpen, toggleCart, items, updateQuantity, removeItem, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-background border-l border-border shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty</p>
              <button onClick={toggleCart} className="text-primary hover:underline text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-4 p-3 bg-white rounded-xl border border-border shadow-sm">
                <div className="relative w-20 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image_url} 
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 text-sm line-clamp-2 leading-tight">{item.title}</h3>
                    {item.variant && <p className="text-xs text-slate-500 mt-1">Variant: {item.variant}</p>}
                    <p className="font-semibold text-primary mt-1">{item.price.toFixed(2)} zł</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-slate-50 rounded-lg border border-border">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="p-1 text-slate-600 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-slate-900 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="p-1 text-slate-600 hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id, item.variant)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">Total</span>
              <span className="text-xl font-bold text-slate-900">{totalPrice().toFixed(2)} zł</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
}