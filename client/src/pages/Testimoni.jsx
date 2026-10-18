import { useEffect, useState } from 'react';
import { MessageSquareQuote, Quote } from 'lucide-react';
import { getTestimoniList } from '../api/testimoniApi';

export default function Testimoni() {
  const [testimoni, setTestimoni] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTestimoniList()
      .then((res) => setTestimoni(res.data))
      .catch(() => setError('Gagal memuat testimoni.'));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <p className="section__eyebrow mono-label">Kata Mereka</p>
        <div className="section__head">
          <h1>Testimoni Klien</h1>
          <MessageSquareQuote size={22} className="icon" aria-hidden="true" />
        </div>
        {error && <p className="alert alert--error" role="alert">{error}</p>}
        <div className="grid-paket">
          {testimoni.map((t) => (
            <article key={t.id} className="card testimoni-card">
              <div className="card__body">
                <Quote size={20} className="icon" aria-hidden="true" style={{ color: 'var(--color-accent)' }} />
                <blockquote>{t.isi}</blockquote>
                <p className="m-0"><strong>{t.nama_klien}</strong></p>
              </div>
            </article>
          ))}
        </div>
        {testimoni.length === 0 && !error && (
          <div className="empty-state">
            <MessageSquareQuote size={28} aria-hidden="true" />
            <p className="m-0">Belum ada testimoni.</p>
          </div>
        )}
      </div>
    </section>
  );
}
