import { db } from '@/lib/db';
import Image from 'next/image';
import SyncButton from '@/components/SyncButton';
import { PackageSearch } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Baza Produktów</h1>
          <p className="text-slate-500 mt-1">Lokalna kopia asortymentu (zsynchronizowanych: {products.length})</p>
        </div>
        <SyncButton />
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Brak produktów</h3>
          <p className="text-slate-500 max-w-sm">
            Twoja lokalna baza danych jest pusta. Kliknij przycisk powyżej, aby pobrać produkty z Sellasista.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Zdjęcie</th>
                  <th className="px-6 py-4">Tytuł</th>
                  <th className="px-6 py-4">Cena (zł)</th>
                  <th className="px-6 py-4">Stan</th>
                  <th className="px-6 py-4">Sellasist ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => {
                  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600';
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-white">
                          <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 line-clamp-2 max-w-xs" title={product.title}>
                        {product.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock_level > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.stock_level} szt.
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                        {product.sellasistId}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}