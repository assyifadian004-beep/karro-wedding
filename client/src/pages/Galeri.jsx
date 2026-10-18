import { useEffect, useState } from 'react';
import { Images, ImageOff } from 'lucide-react';
import { getGaleriList } from '../api/galeriApi';
import ImageWithFallback from '../components/common/ImageWithFallback';

export default function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getGaleriList()
      .then((res) => setGaleri(res.data))
      .catch(() => setError('Gagal memuat galeri.'));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <p className="section__eyebrow mono-label">Dokumentasi</p>
        <div className="section__head">
          <h1>Galeri</h1>
          <Images size={22} className="icon" aria-hidden="true" />
        </div>
        {error && <p className="alert alert--error" role="alert">{error}</p>}
        <div className="grid-galeri">
          {galeri.map((g) => (
            <ImageWithFallback key={g.id} src={g.file} alt={g.keterangan || 'Dokumentasi pernikahan'} />
          ))}
        </div>
        {galeri.length === 0 && !error && (
          <div className="empty-state">
            <ImageOff size={28} aria-hidden="true" />
            <p className="m-0">Belum ada foto.</p>
          </div>
        )}
      </div>
    </section>
  );
}
