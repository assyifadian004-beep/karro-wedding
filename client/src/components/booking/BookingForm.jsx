import { useState } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { validasiForm } from '../../utils/validasiForm';
import { buatPesanWhatsapp, linkWhatsapp } from '../../utils/buatPesanWhatsapp';
import { sanitize } from '../../utils/sanitize';
import { createBooking } from '../../api/bookingApi';

const awal = { nama_lengkap: '', no_wa: '', rencana_tanggal: '', lokasi: '', catatan: '' };
const minTanggal = new Date().toISOString().slice(0, 10);

export default function BookingForm({ paket, nomorAdmin, onTerkirim }) {
  const [values, setValues] = useState(awal);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function ubah(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function simpan() {
    const errs = validasiForm(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return false;
    setLoading(true);
    setStatus(null);
    try {
      const payload = {
        nama_lengkap: sanitize(values.nama_lengkap),
        no_wa: sanitize(values.no_wa),
        rencana_tanggal: values.rencana_tanggal,
        lokasi: sanitize(values.lokasi),
        catatan: sanitize(values.catatan),
        paket_id: paket?.id,
      };
      await createBooking(payload);
      setStatus({ ok: true, message: 'Permintaan booking tersimpan. Lanjut chat WhatsApp admin.' });
      onTerkirim?.();
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal mengirim permintaan. Coba lagi.';
      const fieldErrors = err.response?.data?.errors;
      if (Array.isArray(fieldErrors)) {
        const map = {};
        for (const item of fieldErrors) map[item.path || item.param] = item.msg;
        setErrors(map);
      }
      setStatus({ ok: false, message });
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function kirimWhatsApp(e) {
    e.preventDefault();
    const valid = await simpan();
    if (!valid) return;
    const pesan = buatPesanWhatsapp({
      namaPaket: paket?.nama || 'belum ditentukan',
      nama: sanitize(values.nama_lengkap),
      tanggal: values.rencana_tanggal,
      lokasi: sanitize(values.lokasi),
      catatan: sanitize(values.catatan),
    });
    window.open(linkWhatsapp(nomorAdmin, pesan), '_blank', 'noopener,noreferrer');
  }

  const field = (name) => (errors[name] ? 'form-field form-field--error' : 'form-field');

  return (
    <form className="form card form-card" onSubmit={kirimWhatsApp} noValidate>
      {status && (
        <p className={`alert ${status.ok ? 'alert--success' : 'alert--error'}`} role="alert">
          {status.ok ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
          <span>{status.message}</span>
        </p>
      )}
      <div className={field('nama_lengkap')}>
        <label htmlFor="nama_lengkap">Nama Lengkap</label>
        <input id="nama_lengkap" name="nama_lengkap" value={values.nama_lengkap} onChange={ubah} aria-invalid={Boolean(errors.nama_lengkap)} required />
        {errors.nama_lengkap && <span className="form-error"><AlertCircle size={14} aria-hidden="true" />{errors.nama_lengkap}</span>}
      </div>
      <div className={field('no_wa')}>
        <label htmlFor="no_wa">No. WhatsApp</label>
        <input id="no_wa" name="no_wa" inputMode="tel" placeholder="08xxxxxxxxxx" value={values.no_wa} onChange={ubah} aria-invalid={Boolean(errors.no_wa)} required />
        {errors.no_wa && <span className="form-error"><AlertCircle size={14} aria-hidden="true" />{errors.no_wa}</span>}
      </div>
      <div className={field('rencana_tanggal')}>
        <label htmlFor="rencana_tanggal">Rencana Tanggal</label>
        <input id="rencana_tanggal" name="rencana_tanggal" type="date" min={minTanggal} value={values.rencana_tanggal} onChange={ubah} aria-invalid={Boolean(errors.rencana_tanggal)} required />
        {errors.rencana_tanggal && <span className="form-error"><AlertCircle size={14} aria-hidden="true" />{errors.rencana_tanggal}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="lokasi">Lokasi / Venue (opsional)</label>
        <input id="lokasi" name="lokasi" value={values.lokasi} onChange={ubah} />
      </div>
      <div className="form-field">
        <label htmlFor="catatan">Catatan / Pertanyaan (opsional)</label>
        <textarea id="catatan" name="catatan" rows={3} value={values.catatan} onChange={ubah} />
      </div>
      <button type="submit" className={`btn btn--primary${loading ? ' btn--loading' : ''}`} disabled={loading}>
        {loading ? <span className="spinner" aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
        {loading ? 'Mengirim...' : 'Chat WhatsApp Sekarang'}
      </button>
    </form>
  );
}
