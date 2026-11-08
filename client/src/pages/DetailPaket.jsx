import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Images, Tag, Users, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';
import { getPaketBySlug } from '../api/paketApi';
import { getGaleriByPaket } from '../api/galeriApi';
import { getPengaturan } from '../api/pengaturanApi';
import ImageWithFallback from '../components/common/ImageWithFallback';
import BookingForm from '../components/booking/BookingForm';
import { formatRupiah } from '../utils/formatRupiah';
import { PAKET_LIST } from '../data/paketData';

export default function DetailPaket() {
  const { slug } = useParams();
  const defaultPaket = PAKET_LIST.find((p) => p.slug === slug);
  const [paket, setPaket] = useState(defaultPaket || null);
  const [galeri, setGaleri] = useState([]);
  const [pengaturan, setPengaturan] = useState({ no_wa_admin: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    getPaketBySlug(slug)
      .then((res) => {
        setPaket(res.data);
        return getGaleriByPaket(res.data.id);
      })
      .then((res) => setGaleri(res.data || []))
      .catch(() => {
        if (!defaultPaket) {
          setError('Paket tidak ditemukan.');
        }
      });
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, [slug, defaultPaket]);

  if (error && !defaultPaket) {
    return (
      <section className="section">
        <div className="container">
          <p className="alert alert--error" role="alert">{error}</p>
          <Link to="/paket" className="btn btn--ghost" style={{ marginTop: '16px' }}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Kembali ke Daftar Paket</span>
          </Link>
        </div>
      </section>
    );
  }

  const currentPaket = paket || defaultPaket;

  if (!currentPaket) {
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

  const fasilitasItems =
    currentPaket.fasilitas?.map((f) => (typeof f === 'string' ? f : f.nama)) ||
    defaultPaket?.fasilitas ||
    [];

  const kapasitasText =
    currentPaket.kapasitas?.includes('pack') || currentPaket.kapasitas?.includes('tamu')
      ? currentPaket.kapasitas
      : `${currentPaket.kapasitas} Pack`;

  return (
    <section className="section">
      <div className="container grid gap-10">
        <div>
          <Link to="/paket" className="btn btn--ghost" style={{ marginBottom: '24px' }}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Kembali ke Semua Paket</span>
          </Link>

          <div className="hero" style={{ borderBottom: 'none', paddingBlock: 'var(--spacing-20)' }}>
            <p className="section__eyebrow mono-label">{currentPaket.badge || 'Layanan Resmi'}</p>
            <h1>{currentPaket.nama}</h1>
            <p className="price" style={{ justifyContent: 'center' }}>
              <Tag size={20} aria-hidden="true" />
              {formatRupiah(currentPaket.harga)}
            </p>
            <div className="meta-row" style={{ justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} aria-hidden="true" />
                Kapasitas: {kapasitasText}
              </span>
              {defaultPaket?.crew && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} aria-hidden="true" />
                  {defaultPaket.crew}
                </span>
              )}
              {defaultPaket?.durasi && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} aria-hidden="true" />
                  {defaultPaket.durasi}
                </span>
              )}
            </div>
            <p className="subheading" style={{ marginInline: 'auto', maxWidth: '720px' }}>
              {currentPaket.deskripsi_lengkap || currentPaket.deskripsi_singkat}
            </p>
          </div>
        </div>

        <div>
          <div className="section__head">
            <h2>Fasilitas &amp; Layanan Termasuk (Include)</h2>
            <CheckCircle2 size={22} className="icon" aria-hidden="true" />
          </div>
          <ul className="fasilitas-list">
            {fasilitasItems.map((nama, idx) => (
              <li key={idx}>
                <CheckCircle2 size={18} className="icon" aria-hidden="true" />
                <span>{nama}</span>
              </li>
            ))}
          </ul>
        </div>

        {galeri.length > 0 && (
          <div>
            <div className="section__head">
              <h2>Galeri Dokumentasi</h2>
              <Images size={22} className="icon" aria-hidden="true" />
            </div>
            <div className="grid-galeri">
              {galeri.map((g) => (
                <ImageWithFallback key={g.id} src={g.file} alt={g.keterangan || `Galeri ${currentPaket.nama}`} />
              ))}
            </div>
          </div>
        )}

        <div id="booking">
          <div className="section__head">
            <h2>Formulir Pemesanan {currentPaket.nama}</h2>
            <CalendarDays size={22} className="icon" aria-hidden="true" />
          </div>
          <BookingForm paket={currentPaket} nomorAdmin={pengaturan.no_wa_admin} />
        </div>
      </div>
    </section>
  );
}
