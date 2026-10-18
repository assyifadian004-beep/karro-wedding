import { Link, NavLink } from 'react-router-dom';
import { Sun } from 'lucide-react';

const menu = [
  { to: '/', label: 'Home' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/paket', label: 'Paket' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/testimoni', label: 'Testimoni' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          <Sun size={22} aria-hidden="true" className="accent" />
          Karro Wedding
        </Link>
        <nav className="site-nav" aria-label="Navigasi utama">
          {menu.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/paket" className="btn btn--primary">Konsultasi</Link>
        </nav>
      </div>
    </header>
  );
}
