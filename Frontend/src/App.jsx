import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/login.jsx';
import Register from './Pages/register.jsx';
import Department from './Pages/department.jsx';
import Post from './Pages/post.jsx';
import Staff from './Pages/staff.jsx';
import Recruitment from './Pages/recruitment.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';
import { DashboardLayout } from './components/DashboardLayout.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="department" replace />} />
          <Route path="department" element={<Department />} />
          <Route path="post" element={<Post />} />
          <Route path="staff" element={<Staff />} />
          <Route path="recruitment" element={<Recruitment />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
