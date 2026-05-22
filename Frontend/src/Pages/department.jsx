import { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../lib/api.js';

export default function Department() {
  const [DepName, setDepName] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    const res = await api.get('/department/getAll');
    setItems(res.data || []);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/department/register', { DepName });
      setDepName('');
      setSuccess('Department created');
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-semibold">Department</div>
        <div className="text-sm text-slate-500">Create and view departments</div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
        <section className="rounded-xl border bg-slate-50 p-4">
          <div className="mb-3 text-sm font-semibold">Create department</div>

          {error ? (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Department name
              </label>
              <input
                value={DepName}
                onChange={(e) => setDepName(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="e.g. Pharmacy"
                required
              />
            </div>
            <button
              disabled={loading}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </section>

        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">All departments</div>
            <button
              onClick={() => load()}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">ID</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d._id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{d.DepName}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-600">
                      {d._id}
                    </td>
                  </tr>
                ))}
                {!items.length ? (
                  <tr>
                    <td className="px-3 py-6 text-slate-500" colSpan={2}>
                      No departments yet
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
