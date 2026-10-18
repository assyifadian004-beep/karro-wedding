import { useEffect, useState } from 'react';
import { Images } from 'lucide-react';
import { getPaketList } from '../api/paketApi';
import PaketCard from '../components/paket/PaketCard';

export default function Paket() {
  const [paket, setPaket] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPaketList()
      .then((res) => setPaket(res.data))
      .catch(() => setError('Gagal memuat paket. Pastikan server berjalan.'));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <p className="section__eyebrow mono-label">Layanan</p>
        <div className="section__head">
          <h1>Daftar Paket</h1>
          <Images size={22} className="icon" aria-hidden="true" />
        </div>
        {error && <p className="alert alert--error" role="alert">{error}</p>}
        <div className="grid-paket">
          {paket.map((p) => (
            <PaketCard key={p.id} paket={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
