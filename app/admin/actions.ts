'use server';

import { db } from '@/lib/db';
import { getProducts } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function syncProducts() {
  try {
    const products = await getProducts();

    if (!products || products.length === 0) {
      return { success: false, message: 'Brak produktów do pobrania.' };
    }

    let syncedCount = 0;

    for (const product of products) {
      await db.product.upsert({
        where: { sellasistId: product.id },
        update: {
          title: product.title,
          price: product.price,
          stock_level: product.stock_level,
          category: product.category,
          // description: product.description || '', // We don't overwrite description if we modify it locally
        },
        create: {
          id: product.id,
          sellasistId: product.id,
          title: product.title,
          price: product.price,
          stock_level: product.stock_level,
          category: product.category,
          description: product.description || '',
        },
      });

      // Simple sync for the main image
      if (product.image_url) {
        // Upsert logic for image would be more complex, we just keep it simple and ensure one image exists
        const existingImages = await db.productImage.findMany({ where: { productId: product.id } });
        if (existingImages.length === 0) {
          await db.productImage.create({
            data: {
              url: product.image_url,
              productId: product.id,
            }
          });
        }
      }

      syncedCount++;
    }

    revalidatePath('/admin/products');
    return { success: true, message: `Pomyślnie zsynchronizowano ${syncedCount} produktów.` };
  } catch (error: any) {
    console.error('Błąd synchronizacji:', error);
    return { success: false, message: `Błąd podczas synchronizacji: ${error.message}` };
  }
}