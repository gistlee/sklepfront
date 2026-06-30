export interface Product {
  id: string;
  title: string;
  price: number;
  stock_level: number;
  image_url: string;
  images?: string[];
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

const API_KEY = process.env.SELLASIST_API_KEY || '';
const API_URL = process.env.SELLASIST_API_URL || 'https://jan-pom.sellasist.pl/api/v1';

const getHeaders = () => ({
  'apikey': API_KEY,
  'Content-Type': 'application/json'
});

function extractDescription(desc: any, fallback: string): string {
  if (Array.isArray(desc)) {
    const validDesc = desc.find((d: any) => d.content && typeof d.content === 'string');
    if (validDesc) {
      return validDesc.content.replace(/<img[^>]*>/gi, '').trim();
    }
  } else if (typeof desc === 'string') {
    return desc.replace(/<img[^>]*>/gi, '').trim();
  }
  return fallback;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: getHeaders(),
      next: { revalidate: 60 } // Cache for 60 seconds (ISR)
    });

    if (!res.ok) {
      console.error('Failed to fetch products:', res.statusText);
      return [];
    }

    const data: any[] = await res.json();
    
    // Map Sellasist response to our frontend Product model
    return data.map(item => ({
      id: String(item.id),
      title: item.name || item.title || 'Brak nazwy',
      price: parseFloat(item.price || '0'),
      stock_level: parseInt(item.quantity || '0', 10),
      image_url: item.image_url || item.images?.[0]?.original || 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600',
      category: 'Inne', // Category isn't directly in the products list endpoint
      description: extractDescription(item.description, item.name || ''), 
    }));
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      headers: getHeaders(),
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const item = data.product || data;
    
    const productImages = item.images && Array.isArray(item.images) 
      ? item.images.map((img: any) => img.original || img.thumb).filter(Boolean)
      : [];

    return {
      id: String(item.id),
      title: item.title || item.name || 'Brak nazwy',
      price: parseFloat(item.price || '0'),
      stock_level: parseInt(item.quantity || '0', 10),
      image_url: productImages[0] || item.image_url || 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600',
      images: productImages,
      category: 'Inne',
      description: extractDescription(item.description, item.title || item.name || ''),
    };
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      headers: getHeaders(),
      next: { revalidate: 3600 } // Categories change less often
    });

    if (!res.ok) {
      return [];
    }

    const data: any[] = await res.json();
    
    return data.map(cat => {
      const name = cat.title || 'Inne';
      return {
        id: String(cat.id),
        name: name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };
    });
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}