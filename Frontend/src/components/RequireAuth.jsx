import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api.js';

export function RequireAuth({ children }) {
  const [status, setStatus] = useState('loading'); // loading | authed | unauthed

  useEffect(() => {
    let mounted = true;
    api
      .get('/auth/dashboard')
      .then(() => {
        if (mounted) setStatus('authed');
      })
      .catch(() => {
        if (mounted) setStatus('unauthed');
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-xl border bg-white px-6 py-4 shadow-sm">
          Checking session...
        </div>
      </div>
    );
  }

  if (status === 'unauthed') return <Navigate to="/login" replace />;
  return children;
}

