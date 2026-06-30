'use client';

import { useState } from 'react';
import { syncProducts } from '@/app/admin/actions';
import { RefreshCw } from 'lucide-react';

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setLoading(true);
    setMessage('Synchronizacja w toku...');
    
    try {
      const res = await syncProducts();
      setMessage(res.message);
    } catch (error) {
      setMessage('Błąd krytyczny podczas synchronizacji.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleSync}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Pobieranie...' : 'Pobierz z Sellasist'}
      </button>
      {message && <span className="text-sm font-medium text-slate-600">{message}</span>}
    </div>
  );
}