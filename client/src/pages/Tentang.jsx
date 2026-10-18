export default function Tentang() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow mono-label">Tentang Kami</p>
          <h1>
            Perjalanan <em>Karro</em> Wedding
          </h1>
          <p className="subheading">
            Karro Wedding Organizer adalah tim profesional yang berfokus pada perencanaan dan
            pelaksanaan pernikahan. Kami mendampingi keluarga dari konsultasi awal hingga hari-H.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <p className="section__eyebrow mono-label">Visi</p>
          <div className="section__head">
            <h2>
              Menjadi wedding organizer <em>terpercaya</em> yang membuat setiap pasangan merasa tenang.
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section__eyebrow mono-label">Keunggulan</p>
          <div className="section__head">
            <h2>Yang Membedakan Kami</h2>
          </div>
          <div className="tile-grid">
            <article className="tile tile--navy">
              <p className="mono-label">01</p>
              <h3>Harga Transparan</h3>
              <p>Paket nett tanpa biaya tersembunyi. Anda tahu persis apa yang Anda dapat.</p>
            </article>
            <article className="tile tile--inverse">
              <p className="mono-label">02</p>
              <h3>Tim Berpengalaman</h3>
              <p>Koordinator profesional mendampingi Anda dari persiapan sampai hari-H.</p>
            </article>
            <article className="tile tile--gold">
              <p className="mono-label">03</p>
              <h3>Dokumentasi Rapi</h3>
              <p>Dekorasi dan dokumentasi disusun sesuai konsep acara keluarga Anda.</p>
            </article>
            <article className="tile tile--alt">
              <p className="mono-label">04</p>
              <h3>Respons Cepat</h3>
              <p>Konsultasi langsung melalui WhatsApp dengan pesan yang terarah.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <p className="section__eyebrow mono-label">Angka</p>
          <div className="section__head">
            <h2>Karro dalam Angka</h2>
          </div>
          <div className="stat-grid">
            <article className="stat-card">
              <p className="stat-card__value">3</p>
              <p className="mono-label">Paket Layanan</p>
            </article>
            <article className="stat-card">
              <p className="stat-card__value">1.000</p>
              <p className="mono-label">Tamu Maksimum</p>
            </article>
            <article className="stat-card">
              <p className="stat-card__value">Rp 3,5 jt</p>
              <p className="mono-label">Paket Termurah</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
