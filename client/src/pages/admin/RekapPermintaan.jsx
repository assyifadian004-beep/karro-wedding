import { useEffect, useState } from 'react';
import { ListChecks } from 'lucide-react';
import { getBookingList } from '../../api/bookingApi';

export default function RekapPermintaan() {
  const [daftar, setDaftar] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getBookingList()
      .then((res) => setDaftar(res.data))
      .catch(() => setError('Gagal memuat permintaan.'));
  }, []);

  return (
    <>
      <div className="section__head" style={{ justifyContent: 'flex-start' }}>
        <ListChecks size={22} className="icon" aria-hidden="true" />
        <h1>Rekap Permintaan Booking</h1>
      </div>
      {error && <p className="alert alert--error" role="alert">{error}</p>}
      <div className="table-wrap">
        <table className="table">
        <thead>
          <tr>
            <th>Tanggal Kirim</th>
            <th>Nama</th>
            <th>WhatsApp</th>
            <th>Rencana Tanggal</th>
            <th>Paket</th>
            <th>Lokasi</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((b) => (
            <tr key={b.id}>
              <td>{new Date(b.dikirim_pada).toLocaleString('id-ID')}</td>
              <td>{b.nama_lengkap}</td>
              <td>{b.no_wa}</td>
              <td>{new Date(b.rencana_tanggal).toLocaleDateString('id-ID')}</td>
              <td>{b.nama_paket || '-'}</td>
              <td>{b.lokasi || '-'}</td>
              <td>{b.catatan || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {daftar.length === 0 && !error && <p className="muted">Belum ada permintaan.</p>}
    </>
  );
}
