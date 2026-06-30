export interface Product {
  id: string;
  title: string;
  price: number;
  stock_level: number;
  image_url: string;
  category: string;
  description?: string;
  variants?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Cargo Control', slug: 'cargo-control' },
  { id: 'c2', name: 'Vehicle Accessories', slug: 'vehicle-accessories' },
  { id: 'c3', name: 'Parts & Components', slug: 'parts' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Heavy Duty Cargo Strap 5T',
    price: 45.99,
    stock_level: 120,
    image_url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600',
    category: 'Cargo Control',
    description: 'High strength, durable polyester strap with heavy-duty ratchet mechanism. Ideal for securing heavy transport loads. Certified for 5 tons.',
    variants: ['Orange 8m', 'Blue 10m', 'Red 12m']
  },
  {
    id: 'p2',
    title: 'LED Work Light Bar 120W',
    price: 89.00,
    stock_level: 45,
    image_url: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=600',
    category: 'Vehicle Accessories',
    description: 'Super bright 120W LED light bar. Waterproof IP68. Perfect for off-road vehicles and trucks.',
    variants: ['Spot Beam', 'Flood Beam', 'Combo']
  },
  {
    id: 'p3',
    title: 'Hydraulic Bottle Jack 20T',
    price: 115.50,
    stock_level: 12,
    image_url: 'https://images.unsplash.com/photo-1615826932727-3862cb06e1cc?auto=format&fit=crop&q=80&w=600',
    category: 'Parts & Components',
    description: 'Heavy duty hydraulic bottle jack with a 20-ton capacity. Wide, rugged base adds stability and strength.',
    variants: ['Standard', 'Low Profile']
  },
  {
    id: 'p4',
    title: 'Ratchet Tie Down 2T',
    price: 18.99,
    stock_level: 300,
    image_url: 'https://images.unsplash.com/photo-1530635414876-0bf87e2246ee?auto=format&fit=crop&q=80&w=600',
    category: 'Cargo Control',
    description: 'Standard 2-ton ratchet tie down strap. Easy to use and highly reliable for medium loads.',
  },
  {
    id: 'p5',
    title: 'Truck Wheel Chocks',
    price: 34.00,
    stock_level: 80,
    image_url: 'https://images.unsplash.com/photo-1563200762-2df02e1762e8?auto=format&fit=crop&q=80&w=600',
    category: 'Vehicle Accessories',
    description: 'Heavy duty rubber wheel chocks designed to prevent vehicles from rolling.',
  },
  {
    id: 'p6',
    title: 'Air Brake Hose Assembly',
    price: 55.00,
    stock_level: 0,
    image_url: 'https://images.unsplash.com/photo-1605342971231-155c27633276?auto=format&fit=crop&q=80&w=600',
    category: 'Parts & Components',
    description: 'Flexible air brake hose assembly with heavy duty fittings. Complies with DOT standards.',
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  await delay(300);
  return MOCK_PRODUCTS;
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(200);
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  return product || null;
}

export async function getCategories(): Promise<Category[]> {
  await delay(100);
  return MOCK_CATEGORIES;
}
