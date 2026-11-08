import { useState, useEffect } from 'react';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getGaleriList } from '../api/galeriApi';
import { getPengaturan } from '../api/pengaturanApi';
import { linkWhatsapp } from '../utils/buatPesanWhatsapp';
import { GALERI_ITEMS } from '../data/galeriData';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Galeri() {
  const [items, setItems] = useState(GALERI_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getGaleriList()
      .then(async (res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data
            .filter((g) => g.file && g.file.trim() !== '')
            .map((g) => ({
              id: g.id,
              file: g.file.startsWith('http') || g.file.startsWith('/')
                ? g.file
                : `/uploads/${g.file}`,
              judul: g.keterangan || 'Dokumentasi Pernikahan',
              kategori: g.kategori || 'Resepsi',
              deskripsi: g.deskripsi || g.keterangan || 'Dokumentasi acara resmi Karro Wedding Organizer.',
            }));

          // Verifikasi setiap file API: hanya simpan yang benar-benar bisa diakses
          const checks = await Promise.all(
            mapped.map((item) =>
              fetch(item.file, { method: 'HEAD' })
                .then((r) => (r.ok ? item : null))
                .catch(() => null)
            )
          );
          const apiFormatted = checks.filter(Boolean);

          // Merge: local items yang tidak duplikat dengan API
          const existingFiles = new Set(apiFormatted.map((f) => f.file));
          const localRemaining = GALERI_ITEMS.filter((l) => !existingFiles.has(l.file));
          setItems([...apiFormatted, ...localRemaining]);
        }
      })
      .catch(() => {
        setItems(GALERI_ITEMS);
      });

    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const nomorAdmin = pengaturan?.no_wa_admin || '6281234567890';
  const waDirectUrl = linkWhatsapp(
    nomorAdmin,
    'Halo Tim Karro Wedding Organizer, saya melihat dokumentasi portofolio di galeri dan ingin berkonsultasi mengenai rencana pernikahan saya.'
  );

  const filteredItems = items;

  function handleImageError(itemId) {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  function openLightbox(index) {
    setLightboxIndex(index);
  }

  function nextImage(e) {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }

  function prevImage(e) {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      {/* ── 1. HERO BANNER ── */}
      <section className="galeri-hero" aria-label="Hero Galeri Dokumentasi">
        <img
          src="/images/galeri/af-project-0176.jpg"
          alt="Latar Belakang Dokumentasi Karro Wedding"
          className="galeri-hero__bg"
        />
        <div className="galeri-hero__overlay" aria-hidden="true" />

        <div className="galeri-hero__content">
          <span className="galeri-hero__pill">Dokumentasi Pernikahan</span>
          <h1>
            Momen Pernikahan <em>Terindah</em>
          </h1>
          <p>
            Setiap pasangan memiliki cerita yang unik. Bersama Karro Wedding Organizer,
            kami hadir untuk merancang, mengarahkan, dan mewujudkan hari istimewa Anda
            menjadi kenangan yang akan dikenang seumur hidup.
          </p>
        </div>
      </section>

      {/* ── 2. GRID FOTO ── */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-base, #fdfbf7)' }}>
        <div className="container">

          {/* Grid Kartu Foto */}
          <div className="galeri-grid">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                className="galeri-card"
                onClick={() => openLightbox(idx)}
                aria-label={`Buka foto: ${item.judul}`}
              >
                <div className="galeri-card__image-box">
                  <img
                    src={item.file}
                    alt={item.judul}
                    className="galeri-card__image"
                    loading="lazy"
                    onLoad={(e) => {
                      if (e.target.naturalWidth === 0 || e.target.naturalHeight === 0) {
                        handleImageError(item.id);
                      }
                    }}
                    onError={() => handleImageError(item.id)}
                  />
                  <div className="galeri-card__overlay">
                    <div className="galeri-card__zoom-badge" aria-hidden="true">
                      <ZoomIn size={22} />
                    </div>
                  </div>
                </div>

                <div className="galeri-card__body">
                  <h3 className="galeri-card__title">{item.judul}</h3>
                  <p className="galeri-card__desc">{item.deskripsi}</p>
                  <div className="galeri-card__footer">
                    <span style={{ color: '#c9a227', fontWeight: 600 }}>Lihat Foto &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── 3. BANNER KONSULTASI ── */}
          <div className="custom-banner" style={{ marginTop: 'var(--spacing-40)' }}>
            <div className="custom-banner__text">
              <span className="mono-label">WUJUDKAN WEDDING DREAM</span>
              <h3>Ingin Momen Bahagia Anda Diabadikan Bersama Karro?</h3>
              <p>
                Konsultasikan konsep pernikahan impian Anda bersama tim profesional Karro Wedding Organizer.
                Kami siap merancang dan mengawal acara Anda hingga terlaksana dengan sempurna.
              </p>
            </div>
            <div className="custom-banner__action">
              <a
                href={waDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                style={{ paddingInline: '28px' }}
                aria-label="Konsultasi langsung via WhatsApp"
              >
                <WhatsAppIcon size={20} />
                <span>Konsultasi Sekarang</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. LIGHTBOX MODAL ── */}
      {activeLightboxItem && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan Foto Penuh"
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Tutup foto"
            >
              <X size={22} />
            </button>

            <div className="lightbox-image-wrap">
              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--prev"
                onClick={prevImage}
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={28} />
              </button>

              <img
                src={activeLightboxItem.file}
                alt={activeLightboxItem.judul}
                className="lightbox-image"
              />

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--next"
                onClick={nextImage}
                aria-label="Foto selanjutnya"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="lightbox-info">
              <h2>{activeLightboxItem.judul}</h2>
              <p>{activeLightboxItem.deskripsi}</p>
              <div className="lightbox-counter">
                Foto {lightboxIndex + 1} dari {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
