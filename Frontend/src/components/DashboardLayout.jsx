import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './logout.jsx';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100'
        }`
      }
      end
    >
      {children}
    </NavLink>
  );
}

export function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              SL
            </div>
            <div>
              <div className="text-sm font-semibold leading-4">
                St. Luke Hospital
              </div>
              <div className="text-xs text-slate-500">Admin dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard/department')}
              className="hidden rounded-lg border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:inline-flex"
            >
              Home
            </button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-3 shadow-sm">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Navigation
          </div>
          <nav className="flex flex-col gap-1">
            <NavItem to="/dashboard/department">Department</NavItem>
            <NavItem to="/dashboard/post">Post</NavItem>
            <NavItem to="/dashboard/staff">Staff</NavItem>
            <NavItem to="/dashboard/recruitment">Recruitment</NavItem>
          </nav>
        </aside>

        <main className="rounded-xl border bg-white p-4 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

