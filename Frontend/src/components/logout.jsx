import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';

export default function LogoutButton() {
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await api.post('/auth/logout');
    } finally {
      navigate('/login', { replace: true });
    }
  }

  return (
    <button
      onClick={onLogout}
      className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
    >
      Logout
    </button>
  );
}
