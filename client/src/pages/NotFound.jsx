import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state" style={{ border: 'none' }}>
          <Compass size={36} aria-hidden="true" />
          <h1 className="m-0">Halaman tidak ditemukan</h1>
          <p className="m-0">Halaman yang Anda cari tidak tersedia.</p>
          <Link to="/" className="btn btn--primary">Kembali ke Beranda</Link>
        </div>
      </div>
    </section>
  );
}
