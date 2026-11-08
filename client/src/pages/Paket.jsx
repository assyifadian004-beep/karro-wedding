import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Music,
} from 'lucide-react';
import { getPengaturan } from '../api/pengaturanApi';
import { linkWhatsapp } from '../utils/buatPesanWhatsapp';
import { PAKET_LIST, SYARAT_KETENTUAN } from '../data/paketData';

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Paket() {
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const nomorAdmin = pengaturan?.no_wa_admin || '6281234567890';

  function waPesanPaket(paket) {
    const pesan = `Halo Tim Karro Wedding Organizer, saya tertarik dengan *${paket.nama}* (Rp ${paket.harga.toLocaleString('id-ID')}). Bisakah kita berkonsultasi mengenai ketersediaan jadwal dan rencana acara saya?`;
    return linkWhatsapp(nomorAdmin, pesan);
  }

  const waCustomUrl = linkWhatsapp(
    nomorAdmin,
    'Halo Tim Karro Wedding Organizer, saya ingin berkonsultasi mengenai paket kustom (custom package) sesuai dengan kebutuhan acara saya.'
  );

  return (
    <>
      {/* ── 1. HEADER HALAMAN PRICELIST ── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="pricing-page-header">
            <span className="mono-label">PRICELIST RESMI KARRO WEDDING ORGANIZER</span>
            <h1>
              Pilihan Paket <em>Pernikahan Terbaik</em>
            </h1>
            <p>
              Rekomendasi paket pengorganisasian pernikahan profesional yang transparan, lengkap,
              dan terpercaya. Siap mendampingi Anda dari konsep awal hingga suksesnya hari bahagia.
            </p>
          </div>

          {/* ── 2. GRID 3 KARTU PRICING (SILVER, GOLD, PLATINUM) ── */}
          <div className="pricing-grid">
            {PAKET_LIST.map((p) => {
              const isGold = p.isPopular;
              return (
                <article
                  key={p.id}
                  className={`pricing-card ${isGold ? 'pricing-card--featured' : ''}`}
                >
                  {isGold && (
                    <div className="pricing-ribbon">
                      ⭐ PALING POPULER
                    </div>
                  )}

                  <div className="pricing-card__head">
                    <span className="pricing-card__badge">{p.badge}</span>
                    <h2>{p.nama}</h2>

                    <div className="pricing-card__price-box">
                      <span className="pricing-card__price">
                        Rp {p.harga.toLocaleString('id-ID')}
                      </span>
                      <span className="pricing-card__unit">/ Acara (Nett)</span>
                    </div>

                    <p className="pricing-card__desc">{p.deskripsi_singkat}</p>
                  </div>

                  {/* Spesifikasi Ringkas (Kapasitas, Kru, Jam Kerja) */}
                  <div className="pricing-specs-row">
                    <div className="pricing-spec-item">
                      <Users size={16} aria-hidden="true" />
                      <span className="pricing-spec-val">{p.kapasitas}</span>
                      <span className="pricing-spec-lbl">Kapasitas</span>
                    </div>
                    <div className="pricing-spec-item">
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span className="pricing-spec-val">{p.crew.split(' ')[0]}</span>
                      <span className="pricing-spec-lbl">Crew Tim</span>
                    </div>
                    <div className="pricing-spec-item">
                      <Clock size={16} aria-hidden="true" />
                      <span className="pricing-spec-val">{p.durasi.match(/\d+\s*Jam/i)?.[0] || '1 Day'}</span>
                      <span className="pricing-spec-lbl">Layanan</span>
                    </div>
                  </div>

                  {/* Daftar Fasilitas / Include Lengkap Sesuai PDF */}
                  <div className="pricing-features">
                    <p className="pricing-features-title">Fasilitas Termasuk (Include):</p>
                    <ul className="pricing-features-list">
                      {p.fasilitas.map((f, i) => {
                        const isSaxophone = f.toLowerCase().includes('saxophone');
                        const isDryIce = f.toLowerCase().includes('dry ice');
                        const isSpecial = isSaxophone || isDryIce;

                        return (
                          <li
                            key={i}
                            className={`pricing-feature-item ${isSpecial ? 'pricing-feature-item--highlight' : ''}`}
                          >
                            {isSpecial ? (
                              isSaxophone ? (
                                <Music size={16} aria-hidden="true" />
                              ) : (
                                <Sparkles size={16} aria-hidden="true" />
                              )
                            ) : (
                              <CheckCircle2 size={16} aria-hidden="true" />
                            )}
                            <span>{f}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="pricing-actions">
                    <a
                      href={waPesanPaket(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn--pricing-wa"
                      aria-label={`Pilih dan konsultasi ${p.nama} via WhatsApp`}
                    >
                      <WhatsAppIcon size={18} />
                      <span>Pilih {p.nama}</span>
                    </a>

                    <Link
                      to={`/paket/${p.slug}`}
                      className="btn--pricing-detail"
                      aria-label={`Lihat rincian lengkap ${p.nama}`}
                    >
                      <span>Lihat Rincian &amp; Booking</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── 3. BANNER KONSULTASI CUSTOM PACKAGE ── */}
          <div className="custom-banner">
            <div className="custom-banner__text">
              <span className="mono-label">KONSULTASI FLEKSIBEL</span>
              <h3>Butuh Paket Custom atau Jumlah Tamu Berbeda?</h3>
              <p>
                Karro Wedding Organizer siap merancang paket kustom yang dipersonalisasi
                khusus sesuai konsep, preferensi vendor, dan pagu anggaran pernikahan Anda.
              </p>
            </div>
            <div className="custom-banner__action">
              <a
                href={waCustomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                style={{ paddingInline: '28px' }}
              >
                <WhatsAppIcon size={20} />
                <span>Konsultasi Paket Custom</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SYARAT & KETENTUAN LAYANAN (HALAMAN 5 PDF) ── */}
      <section className="terms-section" id="syarat-ketentuan" aria-label="Syarat dan Ketentuan Layanan">
        <div className="container">
          <div className="terms-header">
            <span className="mono-label">INFORMASI PEMESANAN</span>
            <h2>Syarat &amp; Ketentuan Layanan</h2>
            <p>
              Pedoman resmi kerja sama Karro Wedding Organizer untuk menjamin kejelasan,
              transparansi, dan kelancaran persiapan hari bahagia Anda.
            </p>
          </div>

          <div className="terms-grid">
            {SYARAT_KETENTUAN.map((item) => (
              <article key={item.nomor} className="terms-card">
                <span className="terms-num">{item.nomor}</span>
                <h3>{item.judul}</h3>
                <p>{item.deskripsi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
