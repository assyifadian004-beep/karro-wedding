import { useEffect, useState } from 'react';
import { Images, Upload, Pencil, Trash2 } from 'lucide-react';
import { getGaleriList, createGaleri, updateGaleri, deleteGaleri } from '../../api/galeriApi';
import { getPaketList } from '../../api/paketApi';
import ImageWithFallback from '../../components/common/ImageWithFallback';

export default function KelolaGaleri() {
  const [daftar, setDaftar] = useState([]);
  const [paket, setPaket] = useState([]);
  const [file, setFile] = useState(null);
  const [paketId, setPaketId] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  function muat() {
    getGaleriList().then((res) => setDaftar(res.data)).catch(() => setError('Gagal memuat galeri.'));
  }

  useEffect(() => {
    muat();
    getPaketList().then((res) => setPaket(res.data)).catch(() => {});
  }, []);

  async function tambah(e) {
    e.preventDefault();
    setError('');
    if (!file && !editId) {
      setError('Pilih berkas foto.');
      return;
    }
    try {
      if (editId) {
        await updateGaleri(editId, { paket_id: paketId, keterangan });
        setEditId(null);
      } else {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('paket_id', paketId);
        fd.append('keterangan', keterangan);
        await createGaleri(fd);
      }
      setFile(null);
      setKeterangan('');
      setPaketId('');
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan foto.');
    }
  }

  async function hapus(id) {
    if (!window.confirm('Hapus foto ini?')) return;
    try {
      await deleteGaleri(id);
      muat();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus foto.');
    }
  }

  return (
    <>
      <div className="section__head" style={{ justifyContent: 'flex-start' }}>
        <Images size={22} className="icon" aria-hidden="true" />
        <h1>{editId ? 'Ubah Foto' : 'Unggah Foto'}</h1>
      </div>
      {error && <p className="alert alert--error" role="alert">{error}</p>}
      <form className="form" onSubmit={tambah} style={{ marginBottom: 'var(--spacing-48)', maxWidth: 480 }}>
        {!editId && (
          <div className="form-field">
            <label htmlFor="file">Foto</label>
            <input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
        )}
        <div className="form-field">
          <label htmlFor="paket_id">Paket (opsional)</label>
          <select id="paket_id" value={paketId} onChange={(e) => setPaketId(e.target.value)}>
            <option value="">Galeri umum</option>
            {paket.map((p) => (
              <option key={p.id} value={p.id}>{p.nama}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="keterangan">Keterangan</label>
          <input id="keterangan" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
        </div>
        <button type="submit" className="btn btn--primary">
          <Upload size={16} aria-hidden="true" />
          {editId ? 'Simpan' : 'Unggah'}
        </button>
      </form>

      <h2>Daftar Foto</h2>
      <div className="grid-galeri">
        {daftar.map((g) => (
          <article key={g.id} className="card">
            <ImageWithFallback src={g.file} alt={g.keterangan || 'Foto galeri'} />
            <div className="card__body">
              <p>{g.keterangan || 'Tanpa keterangan'}</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => { setEditId(g.id); setKeterangan(g.keterangan); setPaketId(g.paket_id || ''); }}
              >
                <Pencil size={14} aria-hidden="true" />
                Ubah
              </button>{' '}
              <button type="button" className="btn btn--danger" onClick={() => hapus(g.id)}>
                <Trash2 size={14} aria-hidden="true" />
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
