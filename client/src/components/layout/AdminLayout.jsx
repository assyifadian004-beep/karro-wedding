import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Images,
  MessageSquareQuote,
  Phone,
  ListChecks,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const menu = [
  { to: '/admin', label: 'Dashboard', end: true, icon: LayoutDashboard },
  { to: '/admin/paket', label: 'Kelola Paket', icon: Package },
  { to: '/admin/galeri', label: 'Kelola Galeri', icon: Images },
  { to: '/admin/testimoni', label: 'Kelola Testimoni', icon: MessageSquareQuote },
  { to: '/admin/kontak', label: 'Kelola Kontak', icon: Phone },
  { to: '/admin/permintaan', label: 'Rekap Permintaan', icon: ListChecks },
];

export default function AdminLayout() {
  const { admin, keluar } = useAuth();
  const navigate = useNavigate();

  function logout() {
    keluar();
    navigate('/login');
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <strong className="inline-flex items-center gap-2">
          <Package size={18} aria-hidden="true" />
          Karro Admin
        </strong>
        <span className="text-sm opacity-80">{admin?.nama}</span>
        {menu.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}>
            <Icon size={16} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={logout}
          style={{ color: 'inherit', borderColor: 'currentColor', justifySelf: 'start' }}
        >
          <LogOut size={16} aria-hidden="true" />
          Keluar
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
