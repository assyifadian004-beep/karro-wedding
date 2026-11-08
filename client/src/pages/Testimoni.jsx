import { useState, useEffect } from 'react';
import {
  MessageCircle,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { getPengaturan } from '../api/pengaturanApi';
import { linkWhatsapp } from '../utils/buatPesanWhatsapp';

// 5 Emotikon bertingkat sesuai desain referensi
const RATING_LEVELS = [
  {
    score: 1,
    label: 'Sangat Kecewa',
    color: '#ef4444',
    bgLight: '#fee2e2',
    desc: 'Di bawah ekspektasi',
    initialCount: 2,
  },
  {
    score: 2,
    label: 'Kurang Puas',
    color: '#f97316',
    bgLight: '#ffedd5',
    desc: 'Perlu beberapa perbaikan',
    initialCount: 5,
  },
  {
    score: 3,
    label: 'Cukup Netral',
    color: '#facc15',
    bgLight: '#fef9c3',
    desc: 'Standar sesuai kebutuhan',
    initialCount: 16,
  },
  {
    score: 4,
    label: 'Puas & Senang',
    color: '#86efac',
    activeColor: '#4ade80',
    bgLight: '#f0fdf4',
    desc: 'Pelayanan ramah & tertib',
    initialCount: 92,
  },
  {
    score: 5,
    label: 'Sangat Puas & Bahagia',
    color: '#22c55e',
    activeColor: '#16a34a',
    bgLight: '#dcfce7',
    desc: 'Luar biasa dan berkesan!',
    initialCount: 298,
  },
];

// Komponen SVG untuk wajah ekspresi persis referensi
function ExpressionFace({ score, isSelected, size = 76 }) {
  const colors = {
    1: { bg: '#ef4444' }, // Merah (Marah/Kecewa)
    2: { bg: '#f97316' }, // Oranye (Sedih/Cemberut)
    3: { bg: '#fef08a' }, // Kuning muda (Skeptis/Netral)
    4: { bg: '#bbf7d0' }, // Hijau muda (Senyum ramah)
    5: { bg: '#4ade80' }, // Hijau segar (Tertawa lebar gembira)
  };

  const current = colors[score];

  return (
    <div
      className={`volume-face-wrapper ${isSelected ? 'volume-face-wrapper--active' : ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="volume-face-svg"
      >
        {/* Lingkaran Kepala */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill={current.bg}
          stroke="#262626"
          strokeWidth="4"
        />
        {/* Highlight lengkung atas kepala 3D */}
        <path
          d="M 22 26 A 40 40 0 0 1 78 26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* 1. Sangat Kecewa */}
        {score === 1 && (
          <g stroke="#171717" strokeWidth="4" strokeLinecap="round" fill="#171717">
            <path d="M 28 36 L 42 42" />
            <circle cx="34" cy="46" r="3" stroke="none" />
            <path d="M 72 36 L 58 42" />
            <circle cx="66" cy="46" r="3" stroke="none" />
            <path d="M 32 68 Q 50 54 68 68" fill="none" strokeWidth="5" />
          </g>
        )}

        {/* 2. Kurang Puas */}
        {score === 2 && (
          <g stroke="#171717" strokeWidth="4" strokeLinecap="round" fill="#171717">
            <path d="M 28 40 Q 36 34 42 39" fill="none" />
            <circle cx="36" cy="48" r="3.5" stroke="none" />
            <path d="M 72 40 Q 64 34 58 39" fill="none" />
            <circle cx="64" cy="48" r="3.5" stroke="none" />
            <path d="M 34 68 Q 50 56 66 68" fill="none" strokeWidth="4.5" />
          </g>
        )}

        {/* 3. Cukup Netral */}
        {score === 3 && (
          <g stroke="#171717" strokeWidth="4" strokeLinecap="round" fill="#171717">
            <path d="M 30 46 L 42 45" strokeWidth="4.5" />
            <circle cx="65" cy="46" r="4" stroke="none" />
            <path d="M 40 66 Q 48 64 54 69 Q 62 67 66 63" fill="none" strokeWidth="4" />
          </g>
        )}

        {/* 4. Puas */}
        {score === 4 && (
          <g stroke="#171717" strokeWidth="4" strokeLinecap="round" fill="#171717">
            <circle cx="34" cy="46" r="4.5" stroke="none" />
            <circle cx="66" cy="46" r="4.5" stroke="none" />
            <path d="M 36 62 Q 50 74 64 62" fill="none" strokeWidth="4.5" />
          </g>
        )}

        {/* 5. Sangat Puas */}
        {score === 5 && (
          <g stroke="#171717" strokeWidth="4.5" strokeLinecap="round">
            <path d="M 28 45 Q 36 34 44 45" fill="none" />
            <path d="M 56 45 Q 64 34 72 45" fill="none" />
            <path
              d="M 30 58 Q 50 60 70 58 Q 50 92 30 58 Z"
              fill="#171717"
              stroke="#171717"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Testimoni() {
  // Pilihan level skor yang aktif (1..5)
  const [selectedScore, setSelectedScore] = useState(() => {
    const saved = localStorage.getItem('karro_selected_rating');
    return saved ? Number(saved) : null;
  });

  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem('karro_rating_counts');
    if (saved) return JSON.parse(saved);
    const initial = {};
    RATING_LEVELS.forEach((l) => {
      initial[l.score] = l.initialCount;
    });
    return initial;
  });

  const [toastMsg, setToastMsg] = useState(null);
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    if (selectedScore !== null) {
      localStorage.setItem('karro_selected_rating', String(selectedScore));
    }
  }, [selectedScore]);

  useEffect(() => {
    localStorage.setItem('karro_rating_counts', JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const nomorAdmin = pengaturan?.no_wa_admin || '6281234567890';

  // Handler saat user klik salah satu emotikon langsung
  const handleSelectLevel = (newScore) => {
    setCounts((prev) => {
      const next = { ...prev };
      // Jika sebelumnya pernah memilih, sesuaikan hitungannya
      if (selectedScore && selectedScore !== newScore && next[selectedScore] > 0) {
        next[selectedScore] -= 1;
      }
      if (selectedScore !== newScore) {
        next[newScore] = (next[newScore] || 0) + 1;
      }
      return next;
    });

    setSelectedScore(newScore);

    const targetLevel = RATING_LEVELS.find((v) => v.score === newScore);
    setToastMsg(`Terima kasih! Tingkat kepuasan "${targetLevel.label}" telah dicatat.`);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const currentLevel = RATING_LEVELS.find((v) => v.score === selectedScore);
  const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);

  // Kalkulasi rata-rata skor
  const weightedSum = RATING_LEVELS.reduce(
    (sum, item) => sum + item.score * (counts[item.score] || 0),
    0
  );
  const averageScore = totalVotes > 0 ? (weightedSum / totalVotes).toFixed(1) : '4.9';
  const satisfiedPct =
    totalVotes > 0
      ? Math.round((((counts[4] || 0) + (counts[5] || 0)) / totalVotes) * 100)
      : 98;

  const waConsultUrl = linkWhatsapp(
    nomorAdmin,
    'Halo Tim Karro Wedding Organizer, saya melihat tingkat kepuasan klien di website dan ingin berkonsultasi mengenai rencana pernikahan saya.'
  );

  return (
    <>
      {/* ── 1. HERO REVIEW ── */}
      <section className="testimoni-hero">
        <div className="container">
          <span className="mono-label" style={{ color: 'var(--color-accent)', letterSpacing: '0.2em' }}>
            KEPUASAN KLIEN
          </span>
          <h1 className="testimoni-hero__title">
            Tingkat Kepuasan <em>Klien Karro</em>
          </h1>
          <p className="testimoni-hero__desc">
            Cukup klik salah satu ekspresi di bawah untuk membagikan penilaian kepuasan Anda bersama Karro Wedding Organizer.
          </p>

          {/* Quick CSAT Bar */}
          <div className="testimoni-stats">
            <div className="testimoni-stat-item">
              <span className="testimoni-stat-number">{averageScore} / 5.0</span>
              <span className="testimoni-stat-label">Rata-rata Skor</span>
            </div>
            <div className="testimoni-stat-divider" />
            <div className="testimoni-stat-item">
              <span className="testimoni-stat-number">{satisfiedPct}%</span>
              <span className="testimoni-stat-label">Puas & Sangat Puas</span>
            </div>
            <div className="testimoni-stat-divider" />
            <div className="testimoni-stat-item">
              <span className="testimoni-stat-number">{totalVotes}</span>
              <span className="testimoni-stat-label">Total Penilaian</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BOX PILIHAN EMOTIKON INTERAKTIF (KLIK LANGSUNG) ── */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-base, #fdfbf7)', paddingTop: 0 }}>
        <div className="container">
          
          {toastMsg && (
            <div className="volume-toast-banner" role="status">
              <CheckCircle2 size={18} style={{ color: '#166534' }} />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* KOTAK CONTAINER DENGAN BORDER TEBAL SESUAI GAMBAR CONTOH */}
          <div className="volume-rating-box">
            <div className="volume-rating-box__head">
              <h2 className="volume-box-title">Bagaimana Tingkat Kepuasan Anda?</h2>
              <p className="volume-box-sub">
                Klik salah satu emotikon di bawah untuk memberikan penilaian:
              </p>
            </div>

            {/* BARIS 5 EMOTIKON KLIK LANGSUNG */}
            <div className="volume-faces-row">
              {RATING_LEVELS.map((item) => {
                const isSelected = selectedScore === item.score;
                return (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => handleSelectLevel(item.score)}
                    className={`volume-face-btn ${isSelected ? 'volume-face-btn--selected' : ''}`}
                    aria-label={`Pilih ${item.label}`}
                  >
                    <ExpressionFace score={item.score} isSelected={isSelected} size={78} />
                    <span className="volume-face-label">{item.label}</span>
                    <span className="volume-face-sub">{item.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* STATUS PILIHAN SAAT INI */}
            <div className="rating-active-status">
              {currentLevel ? (
                <span className="rating-status-chip rating-status-chip--selected">
                  ✓ Penilaian Anda: <strong>{currentLevel.label}</strong>
                </span>
              ) : (
                <span className="rating-status-chip">
                  Silakan klik salah satu emotikon di atas
                </span>
              )}
            </div>
          </div>

          {/* ── 3. DISTRIBUSI KEPUASAN KLIEN (FOKUS STATISTIK UTAMA) ── */}
          <div className="rating-breakdown-wrapper">
            <div className="likert-card-panel" style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div className="likert-card-panel__head">
                <TrendingUp size={18} style={{ color: 'var(--color-accent)' }} />
                <h3>Distribusi Kepuasan Klien</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 18px' }}>
                Persebaran tingkat kepuasan yang dipilih oleh para klien:
              </p>

              <div className="likert-breakdown-list">
                {[...RATING_LEVELS].reverse().map((item) => {
                  const count = counts[item.score] || 0;
                  const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                  return (
                    <div key={item.score} className="likert-breakdown-row">
                      <div className="likert-breakdown-label" style={{ width: '160px' }}>
                        <span style={{ fontSize: '20px' }}>
                          {item.score === 1 && '😡'}
                          {item.score === 2 && '🙁'}
                          {item.score === 3 && '😐'}
                          {item.score === 4 && '😊'}
                          {item.score === 5 && '😍'}
                        </span>
                        <span className="likert-breakdown-name">{item.label}</span>
                      </div>
                      <div className="likert-breakdown-bar-bg">
                        <div
                          className="likert-breakdown-bar-fill"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <div className="likert-breakdown-stats">
                        <span className="likert-breakdown-pct">{pct}%</span>
                        <span className="likert-breakdown-count">({count})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── 4. BANNER KONSULTASI ── */}
          <div className="custom-banner" style={{ marginTop: 'var(--spacing-40)' }}>
            <div className="custom-banner__text">
              <span className="mono-label">WUJUDKAN PERNIKAHAN IMPIAN</span>
              <h3>Ingin Acara Anda Berjalan dengan Tingkat Kepuasan 100%?</h3>
              <p>
                Ratusan pasangan telah membuktikan kualitas dan ketenangan bersama Karro Wedding Organizer.
                Konsultasikan konsep serta paket pernikahan impian Anda bersama tim kami.
              </p>
            </div>
            <div className="custom-banner__action">
              <a
                href={waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                style={{ paddingInline: '28px' }}
                aria-label="Konsultasi langsung via WhatsApp"
              >
                <MessageCircle size={20} />
                <span>Konsultasi Sekarang</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
