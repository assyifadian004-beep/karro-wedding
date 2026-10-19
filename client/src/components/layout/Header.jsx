import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';

const menu = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/paket', label: 'Paket' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/testimoni', label: 'Testimoni' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <span className="site-header__mark" aria-hidden="true">
            <Sun size={18} />
          </span>
          Karro Wedding
        </Link>
        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav
          id="site-nav"
          className={`site-nav${open ? ' site-nav--open' : ''}`}
          aria-label="Navigasi utama"
        >
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/paket" className="btn btn--primary site-nav__cta" onClick={() => setOpen(false)}>
            Konsultasi
          </Link>
        </nav>
      </div>
    </header>
  );
}
