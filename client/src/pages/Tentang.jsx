import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ClipboardList,
  Users,
  Clock,
  ShieldCheck,
  CalendarHeart,
  AlertCircle,
  CheckCircle2,
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

const CATEGORIES = ['Semua', 'Layanan', 'Harga & Paket', 'Hari H'];

const FAQ_ITEMS = [
  {
    id: 1,
    category: 'Layanan',
    question: 'Apa yang membedakan Karro dari wedding organizer lainnya?',
    answer:
      'Karro lahir dari kata Jawa yang berarti "bersama" — dan itulah inti kerja kami. Kami bukan sekadar penyedia jasa, melainkan mitra yang benar-benar hadir bersama Anda dari awal hingga akhir. Tim kami kecil tapi solid: setiap anggota terlibat langsung, tidak ada penyerahan tugas ke pihak ketiga tanpa koordinasi ketat.',
  },
  {
    id: 2,
    category: 'Layanan',
    question: 'Jenis acara apa saja yang bisa ditangani oleh Karro?',
    answer:
      'Karro mengelola berbagai rangkaian pernikahan: akad nikah, pemberkatan, resepsi modern, resepsi adat Jawa (siraman, midodareni, kirab, hingga resepsi lengkap), maupun intimate wedding berskala kecil. Kami menyesuaikan diri dengan konsep dan kebutuhan masing-masing pasangan.',
  },
  {
    id: 3,
    category: 'Layanan',
    question: 'Apakah saya bisa membawa vendor pilihan saya sendiri?',
    answer:
      'Tentu. Anda bebas membawa vendor rekanan sendiri — fotografer, MUA, katering, atau siapa pun yang sudah Anda percaya. Tim Karro akan berkoordinasi langsung dengan mereka dalam technical meeting untuk memastikan semua pihak satu frekuensi sebelum hari H.',
  },
  {
    id: 4,
    category: 'Harga & Paket',
    question: 'Bagaimana cara mengetahui paket mana yang paling sesuai untuk saya?',
    answer:
      'Langkah pertama adalah konsultasi awal bersama tim Karro — gratis dan tanpa komitmen. Dari obrolan santai tersebut, kami akan memahami kebutuhan, skala acara, dan anggaran Anda, lalu merekomendasikan pilihan yang paling tepat. Tidak ada paket yang satu ukuran untuk semua.',
  },
  {
    id: 5,
    category: 'Harga & Paket',
    question: 'Bagaimana skema pembayaran yang diterapkan Karro?',
    answer:
      'Pembayaran dilakukan secara bertahap yang transparan: booking fee untuk mengamankan tanggal Anda, termin kedua setelah konsep dan vendor disepakati bersama, serta pelunasan menjelang hari H. Semua rincian biaya tercatat dalam perjanjian kerja sama resmi tanpa biaya tersembunyi.',
  },
  {
    id: 6,
    category: 'Hari H',
    question: 'Berapa kru yang akan hadir mendampingi di hari pernikahan?',
    answer:
      'Jumlah kru disesuaikan dengan skala acara. Untuk resepsi sedang (100–300 tamu), kami menerjunkan minimal 4–6 kru terlatih. Setiap kru memiliki tugas dan zona tanggung jawab yang jelas, dipimpin oleh satu koordinator utama yang selalu siaga di sisi Anda.',
  },
  {
    id: 7,
    category: 'Hari H',
    question: 'Bagaimana Karro menghadapi situasi tak terduga di hari H?',
    answer:
      'Kami selalu menyiapkan Plan B untuk setiap titik kritis acara: cuaca, keterlambatan vendor, hingga perubahan mendadak susunan tamu. Setiap kru dilengkapi kit darurat dan alat komunikasi internal. Filosofi kami sederhana: masalah diselesaikan di balik layar — mempelai dan tamu tidak perlu tahu.',
  },
  {
    id: 8,
    category: 'Hari H',
    question: 'Kapan sebaiknya mulai berkoordinasi dengan tim Karro menjelang hari H?',
    answer:
      'Idealnya 3–4 bulan sebelum acara untuk perencanaan matang. Namun jika waktu Anda lebih singkat, kami tetap siap mendampingi dengan koordinasi yang lebih intensif. Yang terpenting, semakin cepat kami mulai berdiskusi, semakin banyak pilihan terbaik yang bisa kami persiapkan untuk Anda.',
  },
];

const formAwal = { nama_lengkap: '', no_wa: '', rencana_tanggal: '', lokasi: '', catatan: '' };
const minTanggalPernikahan = new Date().toISOString().slice(0, 10);

export default function Tentang() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [openItems, setOpenItems] = useState({});
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

  function toggleItem(id) {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
        namaPaket: 'Konsultasi Umum (Halaman Tentang)',
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

  const filteredFaqs =
    activeCategory === 'Semua'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* ── 1. HERO: PENJELASAN UMUM WEDDING ORGANIZER ── */}
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow mono-label">Mengenal Wedding Organizer</p>
          <h1>
            Peran Penting <em>Wedding Organizer</em>
          </h1>
          <p className="subheading" style={{ maxWidth: '820px', marginInline: 'auto' }}>
            Pernikahan adalah momen berharga sekali seumur hidup. Wedding Organizer hadir bukan
            hanya sebagai eksekutor teknis, melainkan sebagai mitra perancang, koordinator lapangan,
            dan penenang hati — agar Anda bisa menikmati setiap momen berharga tanpa terbebani
            satu pun detail operasional.
          </p>
        </div>
      </section>

      {/* ── 2. CAKUPAN KERJA (LATAR BIRU NAVY ELEGAN) ── */}
      <section className="wo-role-section" id="peran-wo" aria-label="Cakupan Kerja Karro Wedding Organizer">
        <div className="container">
          <div className="wo-role-header">
            <span className="mono-label">CAKUPAN KERJA</span>
            <h2>Yang Karro Kerjakan <em>Untuk Anda</em></h2>
            <p>
              Dari konsep awal di atas kertas hingga momen terakhir di malam resepsi — berikut empat pilar kerja yang Karro emban sepenuh hati:
            </p>
          </div>

          <div className="wo-explainer-grid">
            <article className="wo-explainer-card">
              <div className="wo-card-top">
                <div className="wo-explainer-icon">
                  <ClipboardList size={22} aria-hidden="true" />
                </div>
                <span className="wo-card-number">01</span>
              </div>
              <h3>Rancang Konsep &amp; Anggaran</h3>
              <p>
                Menerjemahkan impian pernikahan Anda menjadi konsep visual yang konkret — tema, palet warna, tata ruang, dan simulasi anggaran yang realistis serta efisien.
              </p>
            </article>

            <article className="wo-explainer-card">
              <div className="wo-card-top">
                <div className="wo-explainer-icon">
                  <Users size={22} aria-hidden="true" />
                </div>
                <span className="wo-card-number">02</span>
              </div>
              <h3>Koordinasi Vendor Terpadu</h3>
              <p>
                Menjadi satu titik koordinasi untuk semua vendor — dekorasi, katering, MUA, dokumentasi, sound, dan venue — sehingga Anda cukup berbicara dengan satu pihak saja.
              </p>
            </article>

            <article className="wo-explainer-card">
              <div className="wo-card-top">
                <div className="wo-explainer-icon">
                  <Clock size={22} aria-hidden="true" />
                </div>
                <span className="wo-card-number">03</span>
              </div>
              <h3>Rundown Menit-per-Menit</h3>
              <p>
                Menyusun alur acara secara presisi dari persiapan pagi hingga peluk terakhir di malam resepsi, memastikan setiap momen berjalan tepat waktu dan penuh kesakralan.
              </p>
            </article>

            <article className="wo-explainer-card">
              <div className="wo-card-top">
                <div className="wo-explainer-icon">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <span className="wo-card-number">04</span>
              </div>
              <h3>Pengawalan Penuh Hari H</h3>
              <p>
                Kru Karro siap di lapangan, mengawasi setiap detail dan menyelesaikan kendala di balik layar — agar mempelai, keluarga, dan tamu hanya merasakan kebahagiaan.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── 3. FAQ: TANYA JAWAB — LAYOUT TERPUSAT (LATAR TERANG BERSIH) ── */}
      <section className="faq-section" id="faq" aria-label="Tanya Jawab Seputar Karro Wedding Organizer">
        <div className="container">

          {/* Header FAQ Terpusat di Atas */}
          <div className="faq-header">
            <span className="mono-label">TANYA JAWAB</span>
            <h2>Ada yang Ingin Anda <em>Tanyakan?</em></h2>
            <p>
              Kami kumpulkan pertanyaan yang paling sering calon pengantin ajukan sebelum memutuskan bekerja sama dengan Karro.
            </p>
          </div>

          {/* Filter Kategori (Pills) Terpusat di Bawah Header */}
          <nav className="faq-tabs" role="tablist" aria-label="Kategori Pertanyaan">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`faq-tab-btn ${isActive ? 'faq-tab-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </nav>

          {/* Accordion List Terpusat (Kartu Putih Rapi) */}
          <div className="faq-list">
            {filteredFaqs.map((item, index) => {
              const isOpen = Boolean(openItems[item.id]);
              const num = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={item.id}
                  className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-wrap">
                      <span className="faq-badge" aria-hidden="true">{num}</span>
                      <span className="faq-question">{item.question}</span>
                    </div>
                    <ChevronDown size={20} className="faq-chevron" aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="faq-content">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. KONSULTASI & PEMESANAN (SESUAI GAMBAR REFERENSI PENGGUNA) ── */}
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
                    <label htmlFor="tentang_nama">Nama Lengkap</label>
                    <input
                      id="tentang_nama"
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
                    <label htmlFor="tentang_wa">No. WhatsApp</label>
                    <input
                      id="tentang_wa"
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
                    <label htmlFor="tentang_tanggal">Rencana Tanggal Pernikahan</label>
                    <input
                      id="tentang_tanggal"
                      name="rencana_tanggal"
                      type="date"
                      min={minTanggalPernikahan}
                      value={formValues.rencana_tanggal}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.rencana_tanggal)}
                    />
                    {formErrors.rencana_tanggal && (
                      <span className="form-error">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.rencana_tanggal}
                      </span>
                    )}
                  </div>

                  <div className={fieldClass('lokasi')}>
                    <label htmlFor="tentang_lokasi">Kota / Lokasi Acara</label>
                    <input
                      id="tentang_lokasi"
                      name="lokasi"
                      placeholder="Contoh: Yogyakarta / Sleman / Bantul"
                      value={formValues.lokasi}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.lokasi)}
                    />
                    {formErrors.lokasi && (
                      <span className="form-error">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.lokasi}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="tentang_catatan">Catatan / Konsep yang Diinginkan</label>
                    <textarea
                      id="tentang_catatan"
                      name="catatan"
                      rows={3}
                      placeholder="Ceritakan konsep adat/modern, estimasi tamu, atau kebutuhan khusus lainnya..."
                      value={formValues.catatan}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="btn btn--primary btn--full"
                  >
                    {formLoading ? 'Menyimpan & Menghubungkan...' : 'Kirim & Lanjut ke WhatsApp'}
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
