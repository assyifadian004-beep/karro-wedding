import { useEffect, useState } from 'react';
import { Phone, Save } from 'lucide-react';
import { getPengaturan, updatePengaturan } from '../../api/pengaturanApi';

export default function KelolaKontak() {
  const [form, setForm] = useState({ no_wa_admin: '', template_pesan: '', info_kontak: '' });
  const [error, setError] = useState('');
  const [sukses, setSukses] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPengaturan()
      .then((res) =>
        setForm({
          no_wa_admin: res.data.no_wa_admin || '',
          template_pesan: res.data.template_pesan || '',
          info_kontak: res.data.info_kontak || '',
        }),
      )
      .catch(() => setError('Gagal memuat pengaturan.'));
  }, []);

  async function simpan(e) {
    e.preventDefault();
    setError('');
    setSukses('');
    setLoading(true);
    try {
      await updatePengaturan(form);
      setSukses('Pengaturan tersimpan.');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan pengaturan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="section__head" style={{ justifyContent: 'flex-start' }}>
        <Phone size={22} className="icon" aria-hidden="true" />
        <h1>Kelola Kontak</h1>
      </div>
      {error && <p className="alert alert--error" role="alert">{error}</p>}
      {sukses && <p className="alert alert--success" role="status">{sukses}</p>}
      <form className="form" onSubmit={simpan} style={{ maxWidth: 480 }}>
        <div className="form-field">
          <label htmlFor="no_wa_admin">Nomor WhatsApp Admin</label>
          <input id="no_wa_admin" placeholder="628xxxxxxxxxx" value={form.no_wa_admin} onChange={(e) => setForm({ ...form, no_wa_admin: e.target.value })} required />
        </div>
        <div className="form-field">
          <label htmlFor="template_pesan">Template Pesan</label>
          <textarea id="template_pesan" rows={3} value={form.template_pesan} onChange={(e) => setForm({ ...form, template_pesan: e.target.value })} />
        </div>
        <div className="form-field">
          <label htmlFor="info_kontak">Informasi Kontak</label>
          <input id="info_kontak" value={form.info_kontak} onChange={(e) => setForm({ ...form, info_kontak: e.target.value })} />
        </div>
        <button type="submit" className={`btn btn--primary${loading ? ' btn--loading' : ''}`} disabled={loading}>
          {loading ? <span className="spinner" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </>
  );
}
