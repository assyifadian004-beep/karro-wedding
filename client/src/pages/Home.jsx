import { useState, useEffect } from 'react';
import {
  ChevronDown,
  CalendarHeart,
  AlertCircle,
  CheckCircle2,
  Target,
  Network,
  MessageSquareShare,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Layers,
} from 'lucide-react';
import { getPengaturan } from '../api/pengaturanApi';
import { validasiForm } from '../utils/validasiForm';
import { buatPesanWhatsapp, linkWhatsapp } from '../utils/buatPesanWhatsapp';
import { sanitize } from '../utils/sanitize';
import { createBooking } from '../api/bookingApi';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const formAwal = { nama_lengkap: '', no_wa: '', rencana_tanggal: '', lokasi: '', catatan: '' };
const minTanggalPernikahan = new Date().toISOString().slice(0, 10);

export default function Home() {
  const [pengaturan, setPengaturan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState(formAwal);
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const nomorAdmin = pengaturan?.no_wa_admin || '6281234567890';
  const pesanKonsultasiDefault =
    'Halo Tim Karro Wedding Organizer, saya ingin berkonsultasi mengenai rencana pernikahan saya.';
  const waDirectUrl = linkWhatsapp(nomorAdmin, pesanKonsultasiDefault);

  function scrollToAbout() {
    const el = document.getElementById('tentang');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues((v) => ({ ...v, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const errs = validasiForm(formValues);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormLoading(true);
    setFormStatus(null);
    try {
      const payload = {
        nama_lengkap: sanitize(formValues.nama_lengkap),
        no_wa: sanitize(formValues.no_wa),
        rencana_tanggal: formValues.rencana_tanggal,
        lokasi: sanitize(formValues.lokasi),
        catatan: sanitize(formValues.catatan),
        paket_id: null,
      };
      await createBooking(payload);
      setFormStatus({
        ok: true,
        message: 'Permintaan konsultasi tersimpan. Membuka percakapan WhatsApp dengan tim Karro...',
      });

      const pesan = buatPesanWhatsapp({
        namaPaket: 'Konsultasi Umum (Beranda)',
        nama: sanitize(formValues.nama_lengkap),
        tanggal: formValues.rencana_tanggal,
        lokasi: sanitize(formValues.lokasi),
        catatan: sanitize(formValues.catatan),
      });
      window.open(linkWhatsapp(nomorAdmin, pesan), '_blank', 'noopener,noreferrer');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Gagal mengirim. Silakan hubungi kami langsung via tombol WhatsApp.';
      setFormStatus({ ok: false, message: msg });
    } finally {
      setFormLoading(false);
    }
  }

  const fieldClass = (name) => (formErrors[name] ? 'form-field form-field--error' : 'form-field');

  return (
    <>
      {/* ── 1. HERO ── Logo Karro berlatar biru navy, tampilan penuh tanpa margin */}
      <section className="landing-hero" id="beranda" aria-label="Beranda Karro Wedding Organizer">
        <div className="landing-hero__visual">
          <img
            src="/images/karro-logo-white.png"
            alt="Karro Wedding Organizer"
            className="landing-hero__image"
          />
        </div>
        <button
          type="button"
          onClick={scrollToAbout}
          className="landing-hero__scroll-indicator"
          aria-label="Gulir ke bagian pengenalan"
        >
          <span>Kenali Kami</span>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </section>

      {/* ── 2. ABOUT ── Foto Tim Presisi, Profil Perusahaan, Visi & Misi */}
      <section className="about-section" id="tentang" aria-label="Tentang Karro Wedding Organizer">
        {/* 2a. Foto Tim Presisi (rasio utuh 1024x682, tanpa terpotong) */}
        <div className="about-photo-wrapper">
          <div className="container">
            <div className="about-photo-frame">
              <img
                src="/images/karro-team-about.jpg"
                alt="Tim Profesional Karro Wedding Organizer bersama Mempelai"
              />
            </div>
          </div>
        </div>

        {/* 2b. Profil Perusahaan (Navy Band) */}
        <div className="about-navy-band">
          <div className="container">
            <div className="about-profile-intro">
              <p className="mono-label" style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>
                PROFIL PERUSAHAAN
              </p>
              <h2>
                Tentang <em>Karro</em> Wedding Organizer
              </h2>
              <p className="about-profile-text">
                Karro Wedding Organizer merupakan sebuah wedding organizer yang terbentuk oleh beberapa
                team profesional dengan tujuan yang sama, yaitu berkeinginan untuk memenejemen suatu acara
                agar berjalan dengan lancar dan sesuai dengan keinginan pihak-pihak yang terlibat.
              </p>
              <div className="about-meaning-card">
                <p>
                  <strong>Karro Wedding Organizer</strong> berasal dari bahasa Jawa yang artinya dengan atau
                  bersama. Harapannya, setiap kali event bersama kami selalu sukses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2c. Visi & Misi Kami (Background Putih Terang dengan Kartu Elegan) */}
        <div className="about-misi-section">
          <div className="container">
            {/* Visi Kami: mengalir natural di bawah profil, tepat sebelum misi */}
            <div className="about-visi-flow">
              <span className="mono-label">
                <Target size={16} aria-hidden="true" />
                VISI KAMI
              </span>
              <h3 className="about-visi-quote">
                "Mewujudkan wedding dream client sehingga dapat memberikan kesan terbaik untuk semua orang."
              </h3>
              <div className="about-visi-divider" aria-hidden="true" />
            </div>

            {/* Misi Kami: 6 kartu berlatar putih dengan nomor dan icon */}
            <div className="about-misi-header">
              <span className="mono-label">KOMITMEN PELAYANAN</span>
              <h3>Misi Kami</h3>
              <p>
                6 komitmen dan dedikasi nyata tim Karro Wedding Organizer demi kesuksesan setiap rangkaian acara pernikahan Anda.
              </p>
            </div>

            <div className="about-misi-grid">
              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">01</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <Network size={18} />
                  </div>
                </div>
                <h4>Relasi Vendor</h4>
                <p>Membangun jaringan dan relasi vendor.</p>
              </article>

              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">02</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <MessageSquareShare size={18} />
                  </div>
                </div>
                <h4>Komunikasi &amp; Transparansi</h4>
                <p>Membangun komunikasi yang baik dan transparansi dengan internal team, client dan vendor.</p>
              </article>

              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">03</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <Sparkles size={18} />
                  </div>
                </div>
                <h4>Strategi Kekinian</h4>
                <p>Melakukan strategi pemasaran dengan konsep kekinian.</p>
              </article>

              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">04</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <h4>Team Solid &amp; Sehat</h4>
                <p>Membangun team yang solid, profesional, kreatif, ceria dan lingkungan team yang sehat.</p>
              </article>

              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">05</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <HeartHandshake size={18} />
                  </div>
                </div>
                <h4>Prioritas Team Work</h4>
                <p>Memprioritaskan team work.</p>
              </article>

              <article className="about-misi-card">
                <div className="about-misi-card__top">
                  <span className="about-misi-card__num">06</span>
                  <div className="about-misi-card__icon" aria-hidden="true">
                    <Layers size={18} />
                  </div>
                </div>
                <h4>Manajemen Menyeluruh</h4>
                <p>Mengorganisir acara secara kesuluruhan dalam berbagai aspek kebutuhan.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KONSULTASI ── CTA & formulir rencana acara → WhatsApp */}
      <section className="consultation-section" id="konsultasi" aria-label="Konsultasi dan Pemesanan">
        <div className="container">
          <div className="consultation-card">
            <div className="consultation-head">
              <p className="mono-label" style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>
                KONSULTASI & PEMESANAN
              </p>
              <h2>Wujudkan Pernikahan Impian Anda Bersama Karro</h2>
              <p className="subheading">
                Diskusikan konsep, kebutuhan acara, atau jadwal pernikahan bersama tim perencana
                profesional kami. Konsultasi awal cepat, mudah, dan ramah melalui WhatsApp.
              </p>
            </div>

            <div className="consultation-cta-row">
              <a
                href={waDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                aria-label="Konsultasi langsung via WhatsApp"
              >
                <WhatsAppIcon size={20} />
                <span>Konsultasi Sekarang via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="btn btn--ghost"
                aria-expanded={showForm}
              >
                <CalendarHeart size={18} aria-hidden="true" />
                <span>{showForm ? 'Tutup Formulir' : 'Isi Rencana Acara Terlebih Dahulu'}</span>
              </button>
            </div>

            {/* Formulir rencana acara opsional */}
            {showForm && (
              <div className="consultation-form-wrapper">
                <form className="form" onSubmit={handleFormSubmit} noValidate>
                  {formStatus && (
                    <p
                      className={`alert ${formStatus.ok ? 'alert--success' : 'alert--error'}`}
                      role="alert"
                    >
                      {formStatus.ok ? (
                        <CheckCircle2 size={18} aria-hidden="true" />
                      ) : (
                        <AlertCircle size={18} aria-hidden="true" />
                      )}
                      <span>{formStatus.message}</span>
                    </p>
                  )}

                  <div className={fieldClass('nama_lengkap')}>
                    <label htmlFor="home_nama">Nama Lengkap</label>
                    <input
                      id="home_nama"
                      name="nama_lengkap"
                      value={formValues.nama_lengkap}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.nama_lengkap)}
                      required
                    />
                    {formErrors.nama_lengkap && (
                      <span className="form-error">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.nama_lengkap}
                      </span>
                    )}
                  </div>

                  <div className={fieldClass('no_wa')}>
                    <label htmlFor="home_wa">No. WhatsApp</label>
                    <input
                      id="home_wa"
                      name="no_wa"
                      inputMode="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formValues.no_wa}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.no_wa)}
                      required
                    />
                    {formErrors.no_wa && (
                      <span className="form-error">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.no_wa}
                      </span>
                    )}
                  </div>

                  <div className={fieldClass('rencana_tanggal')}>
                    <label htmlFor="home_tgl">Rencana Tanggal Pernikahan</label>
                    <input
                      id="home_tgl"
                      name="rencana_tanggal"
                      type="date"
                      min={minTanggalPernikahan}
                      value={formValues.rencana_tanggal}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.rencana_tanggal)}
                      required
                    />
                    {formErrors.rencana_tanggal && (
                      <span className="form-error">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.rencana_tanggal}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="home_lokasi">Lokasi / Kota Acara (opsional)</label>
                    <input
                      id="home_lokasi"
                      name="lokasi"
                      placeholder="Contoh: Gedung atau Rumah di Kota Anda"
                      value={formValues.lokasi}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="home_catatan">Konsep atau Pertanyaan (opsional)</label>
                    <textarea
                      id="home_catatan"
                      name="catatan"
                      rows={3}
                      placeholder="Ceritakan gambaran pernikahan impian Anda..."
                      value={formValues.catatan}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--whatsapp"
                    style={{ width: '100%', marginTop: '8px' }}
                    disabled={formLoading}
                  >
                    <WhatsAppIcon size={18} />
                    <span>{formLoading ? 'Memproses...' : 'Kirim & Lanjut Chat WhatsApp'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}