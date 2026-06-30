import Link from 'next/link';
import { Package, LayoutDashboard, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors">
            <Package className="w-5 h-5" />
            <span className="font-medium">Produkty</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">Panel Administracyjny</h2>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-primary">Powrót do sklepu</Link>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}