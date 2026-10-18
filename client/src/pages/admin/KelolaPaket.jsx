import { useEffect, useState } from 'react';
import { Package, Plus, Pencil, Trash2, X } from 'lucide-react';
import { getPaketList, createPaket, updatePaket, deletePaket } from '../../api/paketApi';

const awal = {
  nama: '',
  harga: '',
  kapasitas: '',
  deskripsi_singkat: '',
  deskripsi_lengkap: '',
  urutan: 0,
  fasilitas: '',
  foto: null,
};

export default function KelolaPaket() {
  const [daftar, setDaftar] = useState([]);
  const [form, setForm] = useState(awal);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [sukses, setSukses] = useState('');

  function muat() {
    getPaketList().then((res) => setDaftar(res.data)).catch(() => setError('Gagal memuat paket.'));
  }

  useEffect(() => {
    muat();
  }, []);

  function ubah(e) {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  }

  function isiEdit(p) {
    setEditId(p.id);
    setForm({
      nama: p.nama,
      harga: p.harga,
      kapasitas: p.kapasitas,
      deskripsi_singkat: p.deskripsi_singkat,
      deskripsi_lengkap: p.deskripsi_lengkap,
      urutan: p.urutan,
      fasilitas: (p.fasilitas || []).map((f) => f.nama).join('\n'),
      foto: null,
    });
  }

  async function simpan(e) {
    e.preventDefault();
    setError('');
    setSukses('');
    const fd = new FormData();
    fd.append('nama', form.nama);
    fd.append('harga', form.harga);
    fd.append('kapasitas', form.kapasitas);
    fd.append('deskripsi_singkat', form.deskripsi_singkat);
    fd.append('deskripsi_lengkap', form.deskripsi_lengkap);
    fd.append('urutan', form.urutan);
    form.fasilitas
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((nama) => fd.append('fasilitas[]', nama));
    if (form.foto) fd.append('foto', form.foto);
    try {
      if (editId) await updatePaket(editId, fd);
      else await createPaket(fd);
      setSukses(editId ? 'Paket diperbarui.' : 'Paket ditambahkan.');
      setForm(awal);
      setEditId(null);
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan paket.');
    }
  }

  async function hapus(id) {
    if (!window.confirm('Hapus paket ini?')) return;
    try {
      await deletePaket(id);
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus paket.');
    }
  }

  return (
    <>
      <div className="section__head" style={{ justifyContent: 'flex-start' }}>
        <Package size={22} className="icon" aria-hidden="true" />
        <h1>{editId ? 'Ubah Paket' : 'Tambah Paket'}</h1>
      </div>
      {error && <p className="alert alert--error" role="alert">{error}</p>}
      {sukses && <p className="alert alert--success" role="status">{sukses}</p>}
      <form className="form" onSubmit={simpan} style={{ marginBottom: 'var(--spacing-48)', maxWidth: 560 }}>
        <div className="form-field">
          <label htmlFor="nama">Nama Paket</label>
          <input id="nama" name="nama" value={form.nama} onChange={ubah} required />
        </div>
        <div className="form-field">
          <label htmlFor="harga">Harga (Rp)</label>
          <input id="harga" name="harga" type="number" min="0" value={form.harga} onChange={ubah} required />
        </div>
        <div className="form-field">
          <label htmlFor="kapasitas">Kapasitas Tamu</label>
          <input id="kapasitas" name="kapasitas" placeholder="150-250" value={form.kapasitas} onChange={ubah} required />
        </div>
        <div className="form-field">
          <label htmlFor="deskripsi_singkat">Deskripsi Singkat</label>
          <textarea id="deskripsi_singkat" name="deskripsi_singkat" value={form.deskripsi_singkat} onChange={ubah} />
        </div>
        <div className="form-field">
          <label htmlFor="deskripsi_lengkap">Deskripsi Lengkap</label>
          <textarea id="deskripsi_lengkap" name="deskripsi_lengkap" rows={4} value={form.deskripsi_lengkap} onChange={ubah} />
        </div>
        <div className="form-field">
          <label htmlFor="fasilitas">Fasilitas (satu per baris)</label>
          <textarea id="fasilitas" name="fasilitas" rows={4} value={form.fasilitas} onChange={ubah} />
        </div>
        <div className="form-field">
          <label htmlFor="urutan">Urutan Tampil</label>
          <input id="urutan" name="urutan" type="number" min="0" value={form.urutan} onChange={ubah} />
        </div>
        <div className="form-field">
          <label htmlFor="foto">Foto Utama</label>
          <input id="foto" name="foto" type="file" accept="image/*" onChange={ubah} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn--primary">
            {editId ? <Pencil size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {editId ? 'Simpan Perubahan' : 'Tambah'}
          </button>
          {editId && (
            <button type="button" className="btn btn--ghost" onClick={() => { setEditId(null); setForm(awal); }}>
              <X size={16} aria-hidden="true" />
              Batal
            </button>
          )}
        </div>
      </form>

      <h2>Daftar Paket</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Nama</th><th>Harga</th><th>Kapasitas</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {daftar.map((p) => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>{p.harga}</td>
                <td>{p.kapasitas}</td>
                <td>
                  <button type="button" className="btn btn--ghost" onClick={() => isiEdit(p)}>
                    <Pencil size={14} aria-hidden="true" />
                    Ubah
                  </button>{' '}
                  <button type="button" className="btn btn--danger" onClick={() => hapus(p.id)}>
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
