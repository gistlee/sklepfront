import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.id === newItem.id && item.variant === newItem.variant
        );

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id && item.variant === newItem.variant
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          };
        }
        
        return { items: [...state.items, newItem] };
      }),

      removeItem: (id, variant) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.id === id && item.variant === variant)
        ),
      })),

      updateQuantity: (id, quantity, variant) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.variant === variant
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
