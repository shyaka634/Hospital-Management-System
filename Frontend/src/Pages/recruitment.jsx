import { useEffect, useMemo, useState } from 'react';
import { api, getErrorMessage } from '../lib/api.js';

export default function Recruitment() {
  const [HireDate, setHireDate] = useState('');
  const [Salary, setSalary] = useState('');
  const [Status, setStatus] = useState('');
  const [EmployeeId, setEmployeeId] = useState('');

  const [staff, setStaff] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const staffOptions = useMemo(
    () =>
      staff.map((s) => ({
        id: s._id,
        label: `${s.FirstName} ${s.LastName} (${s.Email})`,
      })),
    [staff],
  );

  async function load() {
    const [staffRes, recRes] = await Promise.all([
      api.get('/staff/getAll'),
      api.get('/recruitment/filterAll'),
    ]);
    setStaff(staffRes.data || []);
    setItems(recRes.data || []);
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
      await api.post('/recruitment/register', {
        HireDate,
        Salary,
        Status,
        EmployeeId,
      });
      setHireDate('');
      setSalary('');
      setStatus('');
      setEmployeeId('');
      setSuccess('Recruitment created');
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
        <div className="text-lg font-semibold">Recruitment</div>
        <div className="text-sm text-slate-500">
          Create recruitment records (FK: Staff)
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[460px_1fr]">
        <section className="rounded-xl border bg-slate-50 p-4">
          <div className="mb-3 text-sm font-semibold">Create recruitment</div>

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
                Employee (FK)
              </label>
              <select
                value={EmployeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                required
              >
                <option value="" disabled>
                  Select staff...
                </option>
                {staffOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Hire date
                </label>
                <input
                  value={HireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  type="date"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Salary
                </label>
                <input
                  value={Salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="e.g. 1200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Status
              </label>
              <input
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="e.g. Active"
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
            <div className="text-sm font-semibold">All recruitment</div>
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
                  <th className="px-3 py-2">Employee</th>
                  <th className="px-3 py-2">Hire date</th>
                  <th className="px-3 py-2">Salary</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r._id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">
                      {r.EmployeeId
                        ? `${r.EmployeeId.FirstName} ${r.EmployeeId.LastName}`
                        : '(not populated)'}
                    </td>
                    <td className="px-3 py-2">
                      {r.HireDate ? new Date(r.HireDate).toLocaleDateString() : ''}
                    </td>
                    <td className="px-3 py-2">{r.Salary}</td>
                    <td className="px-3 py-2">{r.Status}</td>
                  </tr>
                ))}
                {!items.length ? (
                  <tr>
                    <td className="px-3 py-6 text-slate-500" colSpan={4}>
                      No recruitment records yet
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
