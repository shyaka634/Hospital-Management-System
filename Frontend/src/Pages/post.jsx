import { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../lib/api.js';

export default function Post() {
  const [postTitle, setPostTitle] = useState('');
  const [Department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    const [depRes, postRes] = await Promise.all([
      api.get('/department/getAll'),
      api.get('/post/getAll'),
    ]);

    setDepartments(depRes.data || []);
    setPosts(postRes.data || []);
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
      await api.post('/post/register', { postTitle, Department });

      setPostTitle('');
      setDepartment('');
      setSuccess('Post created');

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
        <div className="text-lg font-semibold">Post</div>
        <div className="text-sm text-slate-500">
          Create posts (with Department foreign key)
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
        <section className="rounded-xl border bg-slate-50 p-4">
          <div className="mb-3 text-sm font-semibold">Create post</div>

          {error && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Post title
              </label>
              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="e.g. Nurse"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Department (FK)
              </label>
              <select
                value={Department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                required
              >
                <option value="" disabled>
                  Select department...
                </option>

                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.DepName}
                  </option>
                ))}
              </select>

              <div className="mt-1 text-xs text-slate-500">
                The selected department’s <span className="font-mono">_id</span>{' '}
                will be saved to <span className="font-mono">Post.Department</span>.
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
            <div className="text-sm font-semibold">All posts</div>

            <button
              onClick={load}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Department</th>
                  <th className="px-3 py-2">Post ID</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((p) => (
                  <tr key={p._id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{p.postTitle}</td>

                    <td className="px-3 py-2">
                      {p.Department?.DepName || (
                        <span className="text-slate-500">(not populated)</span>
                      )}
                    </td>

                    <td className="px-3 py-2 font-mono text-xs text-slate-600">
                      {p._id}
                    </td>
                  </tr>
                ))}

                {!posts.length && (
                  <tr>
                    <td className="px-3 py-6 text-slate-500" colSpan={3}>
                      No posts yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}