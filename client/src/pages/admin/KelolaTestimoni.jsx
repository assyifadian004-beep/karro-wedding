import { useEffect, useState } from 'react';
import { MessageSquareQuote, Plus, Pencil, Trash2, X } from 'lucide-react';
import { getTestimoniList, createTestimoni, updateTestimoni, deleteTestimoni } from '../../api/testimoniApi';

const awal = { nama_klien: '', isi: '', foto: null };

export default function KelolaTestimoni() {
  const [daftar, setDaftar] = useState([]);
  const [form, setForm] = useState(awal);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  function muat() {
    getTestimoniList().then((res) => setDaftar(res.data)).catch(() => setError('Gagal memuat testimoni.'));
  }

  useEffect(() => {
    muat();
  }, []);

  async function simpan(e) {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.append('nama_klien', form.nama_klien);
    fd.append('isi', form.isi);
    if (form.foto) fd.append('foto', form.foto);
    try {
      if (editId) await updateTestimoni(editId, fd);
      else await createTestimoni(fd);
      setForm(awal);
      setEditId(null);
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan testimoni.');
    }
  }

  async function hapus(id) {
    if (!window.confirm('Hapus testimoni ini?')) return;
    try {
      await deleteTestimoni(id);
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus testimoni.');
    }
  }

  return (
    <>
      <div className="section__head" style={{ justifyContent: 'flex-start' }}>
        <MessageSquareQuote size={22} className="icon" aria-hidden="true" />
        <h1>{editId ? 'Ubah Testimoni' : 'Tambah Testimoni'}</h1>
      </div>
      {error && <p className="alert alert--error" role="alert">{error}</p>}
      <form className="form" onSubmit={simpan} style={{ marginBottom: 'var(--spacing-48)', maxWidth: 480 }}>
        <div className="form-field">
          <label htmlFor="nama_klien">Nama Klien</label>
          <input id="nama_klien" value={form.nama_klien} onChange={(e) => setForm({ ...form, nama_klien: e.target.value })} required />
        </div>
        <div className="form-field">
          <label htmlFor="isi">Isi Testimoni</label>
          <textarea id="isi" rows={4} value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} required />
        </div>
        <div className="form-field">
          <label htmlFor="foto">Foto (opsional)</label>
          <input id="foto" type="file" accept="image/*" onChange={(e) => setForm({ ...form, foto: e.target.files[0] })} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn--primary">
            {editId ? <Pencil size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {editId ? 'Simpan' : 'Tambah'}
          </button>
          {editId && (
            <button type="button" className="btn btn--ghost" onClick={() => { setEditId(null); setForm(awal); }}>
              <X size={16} aria-hidden="true" />
              Batal
            </button>
          )}
        </div>
      </form>

      <h2>Daftar Testimoni</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Nama</th><th>Isi</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {daftar.map((t) => (
              <tr key={t.id}>
                <td>{t.nama_klien}</td>
                <td>{t.isi}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => { setEditId(t.id); setForm({ nama_klien: t.nama_klien, isi: t.isi, foto: null }); }}
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Ubah
                  </button>{' '}
                  <button type="button" className="btn btn--danger" onClick={() => hapus(t.id)}>
                    <Trash2 size={14} aria-hidden="true" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
