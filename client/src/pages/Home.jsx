import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CalendarHeart, ArrowRight } from 'lucide-react';
import { getPaketList } from '../api/paketApi';
import PaketCard from '../components/paket/PaketCard';

export default function Home() {
  const [paket, setPaket] = useState([]);

  useEffect(() => {
    getPaketList()
      .then((res) => setPaket(res.data.slice(0, 3)))
      .catch(() => setPaket([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow mono-label">
            <Sparkles size={14} aria-hidden="true" />
            Wedding Organizer Terpercaya
          </p>
          <h1>
            Pernikahan <em>Impian</em> bersama Karro Wedding
          </h1>
          <p className="subheading">
            Karro Wedding Organizer membantu Anda merencanakan pernikahan dari awal hingga hari-H.
            Bandingkan paket, lihat hasil karya kami, lalu konsultasi lewat WhatsApp.
          </p>
          <div className="hero__actions">
            <Link to="/paket" className="btn btn--primary">
              Lihat Paket
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/galeri" className="btn btn--ghost">
              Lihat Galeri
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section__eyebrow mono-label">Layanan</p>
          <div className="section__head">
            <h2>Paket Unggulan</h2>
            <Sparkles size={22} className="icon" aria-hidden="true" />
          </div>
          <div className="grid-paket">
            {paket.map((p) => (
              <PaketCard key={p.id} paket={p} />
            ))}
            {paket.length === 0 && (
              <div className="empty-state">
                <Sparkles size={28} aria-hidden="true" />
                <p className="m-0">Memuat paket...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
