import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Images, Tag, Users } from 'lucide-react';
import { getPaketBySlug } from '../api/paketApi';
import { getGaleriByPaket } from '../api/galeriApi';
import { getPengaturan } from '../api/pengaturanApi';
import ImageWithFallback from '../components/common/ImageWithFallback';
import BookingForm from '../components/booking/BookingForm';
import { formatRupiah } from '../utils/formatRupiah';

export default function DetailPaket() {
  const { slug } = useParams();
  const [paket, setPaket] = useState(null);
  const [galeri, setGaleri] = useState([]);
  const [pengaturan, setPengaturan] = useState({ no_wa_admin: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    getPaketBySlug(slug)
      .then((res) => {
        setPaket(res.data);
        return getGaleriByPaket(res.data.id);
      })
      .then((res) => setGaleri(res.data))
      .catch(() => setError('Paket tidak ditemukan.'));
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, [slug]);

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <p className="alert alert--error" role="alert">{error}</p>
        </div>
      </section>
    );
  }

  if (!paket) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <p className="m-0">Memuat detail paket...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container grid gap-10">
        <div className="hero" style={{ borderBottom: 'none', paddingBlock: 'var(--spacing-20)' }}>
          <p className="section__eyebrow mono-label">Paket {paket.nama}</p>
          <h1>{paket.nama}</h1>
          <p className="price" style={{ justifyContent: 'center' }}>
            <Tag size={20} aria-hidden="true" />
            {formatRupiah(paket.harga)}
          </p>
          <p className="meta-row" style={{ justifyContent: 'center' }}>
            <Users size={16} aria-hidden="true" />
            Kapasitas: {paket.kapasitas} tamu
          </p>
          <p className="subheading" style={{ marginInline: 'auto' }}>{paket.deskripsi_lengkap}</p>
        </div>

        <div>
          <div className="section__head">
            <h2>Apa yang Anda Dapatkan</h2>
            <CheckCircle2 size={22} className="icon" aria-hidden="true" />
          </div>
          <ul className="fasilitas-list">
            {paket.fasilitas?.map((f) => (
              <li key={f.id}>
                <CheckCircle2 size={18} className="icon" aria-hidden="true" />
                <span>{f.nama}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="section__head">
            <h2>Galeri Paket</h2>
            <Images size={22} className="icon" aria-hidden="true" />
          </div>
          <div className="grid-galeri">
            {galeri.map((g) => (
              <ImageWithFallback key={g.id} src={g.file} alt={g.keterangan || `Galeri ${paket.nama}`} />
            ))}
          </div>
          {galeri.length === 0 && (
            <div className="empty-state">
              <Images size={28} aria-hidden="true" />
              <p className="m-0">Belum ada foto untuk paket ini.</p>
            </div>
          )}
        </div>

        <div id="booking">
          <div className="section__head">
            <h2>Formulir Booking</h2>
            <CalendarDays size={22} className="icon" aria-hidden="true" />
          </div>
          <BookingForm paket={paket} nomorAdmin={pengaturan.no_wa_admin} />
        </div>
      </div>
    </section>
  );
}
