import { useEffect, useMemo, useState } from 'react';
import { api, getErrorMessage } from '../lib/api.js';

function toInputDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function Staff() {
  const [posts, setPosts] = useState([]);
  const [staff, setStaff] = useState([]);

  // create form
  const [postId, setPostId] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Gender, setGender] = useState('male');
  const [Date_Of_Birth, setDob] = useState('');

  const [editingId, setEditingId] = useState('');
  const [editPayload, setEditPayload] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const postOptions = useMemo(
    () =>
      posts.map((p) => ({
        id: p._id,
        label: `${p.postTitle}${p.Department?.DepName ? ` — ${p.Department.DepName}` : ''}`,
      })),
    [posts],
  );

  async function load() {
    const [postRes, staffRes] = await Promise.all([
      api.get('/post/getAll'),
      api.get('/staff/getAll'),
    ]);
    setPosts(postRes.data || []);
    setStaff(staffRes.data || []);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function onCreate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/staff/register', {
        postId,
        FirstName,
        LastName,
        Email,
        Phone,
        Address,
        Gender,
        Date_Of_Birth,
      });
      setSuccess('Staff created');
      setPostId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setGender('male');
      setDob('');
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function startEdit(row) {
    setEditingId(row._id);
    setEditPayload({
      postId: row.postId?._id || row.postId || '',
      FirstName: row.FirstName || '',
      LastName: row.LastName || '',
      Email: row.Email || '',
      Phone: row.Phone || '',
      Address: row.Address || '',
      Gender: row.Gender || 'male',
      Date_Of_Birth: toInputDate(row.Date_Of_Birth),
    });
    setError('');
    setSuccess('');
  }

  async function saveEdit() {
    if (!editingId || !editPayload) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.put(`/staff/update/${editingId}`, editPayload);
      setSuccess('Updated');
      setEditingId('');
      setEditPayload(null);
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!id) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.delete(`/staff/delete/${id}`);
      setSuccess('Deleted');
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
        <div className="text-lg font-semibold">Staff</div>
        <div className="text-sm text-slate-500">
          Create / update / delete staff (FK: Post)
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[460px_1fr]">
        <section className="rounded-xl border bg-slate-50 p-4">
          <div className="mb-3 text-sm font-semibold">Create staff</div>
          <form onSubmit={onCreate} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Post (FK)
              </label>
              <select
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                required
              >
                <option value="" disabled>
                  Select post...
                </option>
                {postOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  First name
                </label>
                <input
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Last name
                </label>
                <input
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Date of birth
                </label>
                <input
                  value={Date_Of_Birth}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  type="date"
                  required
                />
              </div>
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
            <div className="text-sm font-semibold">All staff</div>
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
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Post</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s._id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">
                      {s.FirstName} {s.LastName}
                    </td>
                    <td className="px-3 py-2">{s.Email}</td>
                    <td className="px-3 py-2">{s.Phone}</td>
                    <td className="px-3 py-2">
                      {s.postId?.postTitle || (
                        <span className="text-slate-500">(not populated)</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(s)}
                          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(s._id)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!staff.length ? (
                  <tr>
                    <td className="px-3 py-6 text-slate-500" colSpan={5}>
                      No staff yet
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {editingId && editPayload ? (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold">Edit staff</div>
              <button
                onClick={() => {
                  setEditingId('');
                  setEditPayload(null);
                }}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Post (FK)
                </label>
                <select
                  value={editPayload.postId}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, postId: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                >
                  <option value="" disabled>
                    Select post...
                  </option>
                  {postOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  First name
                </label>
                <input
                  value={editPayload.FirstName}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, FirstName: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Last name
                </label>
                <input
                  value={editPayload.LastName}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, LastName: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  value={editPayload.Email}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, Email: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  value={editPayload.Phone}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, Phone: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  value={editPayload.Address}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, Address: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  value={editPayload.Gender}
                  onChange={(e) =>
                    setEditPayload((p) => ({ ...p, Gender: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Date of birth
                </label>
                <input
                  value={editPayload.Date_Of_Birth}
                  onChange={(e) =>
                    setEditPayload((p) => ({
                      ...p,
                      Date_Of_Birth: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  type="date"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingId('');
                  setEditPayload(null);
                }}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
