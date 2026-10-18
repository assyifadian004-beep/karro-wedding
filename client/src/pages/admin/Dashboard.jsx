import { useEffect, useState } from 'react';
import { Package, Images, MessageSquareQuote, ListChecks } from 'lucide-react';
import { getPaketList } from '../../api/paketApi';
import { getGaleriList } from '../../api/galeriApi';
import { getTestimoniList } from '../../api/testimoniApi';
import { getBookingList } from '../../api/bookingApi';

const kartu = [
  { key: 'paket', label: 'Paket', icon: Package },
  { key: 'galeri', label: 'Galeri', icon: Images },
  { key: 'testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { key: 'booking', label: 'Permintaan', icon: ListChecks },
];

export default function Dashboard() {
  const [ringkas, setRingkas] = useState({ paket: 0, galeri: 0, testimoni: 0, booking: 0 });

  useEffect(() => {
    Promise.all([
      getPaketList().catch(() => ({ data: [] })),
      getGaleriList().catch(() => ({ data: [] })),
      getTestimoniList().catch(() => ({ data: [] })),
      getBookingList().catch(() => ({ data: [] })),
    ]).then(([p, g, t, b]) =>
      setRingkas({ paket: p.data.length, galeri: g.data.length, testimoni: t.data.length, booking: b.data.length }),
    );
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid-paket">
        {kartu.map(({ key, label, icon: Icon }) => (
          <article key={key} className="card">
            <div className="card__body">
              <p className="meta-row m-0">
                <Icon size={18} aria-hidden="true" />
                {label}
              </p>
              <p className="price m-0">{ringkas[key]}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
