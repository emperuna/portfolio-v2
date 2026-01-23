import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/api';

export default function HealthCheck() {
  const [status, setStatus] = useState<'loading' | 'healthy' | 'error'>('loading');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    fetchAPI('/health')
      .then((data) => {
        setStatus('healthy');
        setDetails(JSON.stringify(data));
      })
      .catch((err) => {
        setStatus('error');
        setDetails(err.message);
      });
  }, []);

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white/50 backdrop-blur shadow-sm max-w-sm">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">System Status</h2>
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${
          status === 'healthy' ? 'bg-green-500 shadow-[0_0_10px_theme(colors.green.500)]' :
          status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
        }`} />
        <span className="font-mono text-sm text-gray-600">
          {status === 'loading' ? 'Checking connection...' :
           status === 'healthy' ? 'Online' : 'Offline'}
        </span>
      </div>
      {details && (
        <pre className="mt-2 text-[10px] text-gray-400 overflow-x-auto">
          {details}
        </pre>
      )}
    </div>
  );
}
