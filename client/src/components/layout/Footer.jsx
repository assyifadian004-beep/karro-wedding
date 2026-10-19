import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, MessageCircle, MapPin } from 'lucide-react';
import { getPengaturan } from '../../api/pengaturanApi';

const tahun = new Date().getFullYear();

const kolomPerusahaan = [
  { to: '/tentang', label: 'Tentang Kami' },
  { to: '/testimoni', label: 'Testimoni' },
  { to: '/galeri', label: 'Galeri' },
];

const kolomJelajahi = [
  { to: '/', label: 'Beranda' },
  { to: '/paket', label: 'Paket Pernikahan' },
  { to: '/paket', label: 'Konsultasi' },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H6.5v3.5H9V21h3.5v-7.5H15L15.5 10H12.5V7.5c0-.6.4-1 1-1H15V3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4v5.2L14.8 12z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const sosial = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
];

function waLink(noWa) {
  if (!noWa) return null;
  const digits = noWa.replace(/\D/g, '').replace(/^0/, '62');
  return `https://wa.me/${digits}`;
}

export default function Footer({ kontak }) {
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const data = kontak || pengaturan || {};
  const wa = waLink(data.no_wa_admin);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <Link to="/" className="site-footer__brand">
            <span className="site-footer__mark" aria-hidden="true">
              <Sun size={18} />
            </span>
            Karro Wedding
          </Link>
          <p className="site-footer__tagline">Mewujudkan pernikahan impian bersama tim profesional.</p>
        </div>

        <hr className="site-footer__divider" />

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <h3>Perusahaan</h3>
            {kolomPerusahaan.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__col">
            <h3>Navigasi</h3>
            {kolomJelajahi.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__col">
            <h3>Kontak</h3>
            {wa && (
              <a className="site-footer__contact-item" href={wa} target="_blank" rel="noreferrer">
                <span className="icon-badge" aria-hidden="true">
                  <MessageCircle size={16} />
                </span>
                {data.no_wa_admin}
              </a>
            )}
            {data.info_kontak && (
              <span className="site-footer__contact-item">
                <span className="icon-badge" aria-hidden="true">
                  <MapPin size={16} />
                </span>
                {data.info_kontak}
              </span>
            )}
          </div>

          <div className="site-footer__social">
            {sosial.map(({ label, Icon }) => (
              <span key={label} title={label} aria-label={label} role="img">
                <Icon />
              </span>
            ))}
          </div>
        </div>

        <hr className="site-footer__divider" />

        <div className="site-footer__bottom">
          <p>&copy; {tahun} Karro Wedding Organizer. Hak cipta dilindungi.</p>
          <div className="site-footer__legal">
            <span>Syarat &amp; Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
