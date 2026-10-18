import { Link } from 'react-router-dom';
import { Users, Tag, ArrowRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { formatRupiah } from '../../utils/formatRupiah';

export default function PaketCard({ paket }) {
  return (
    <article className="card">
      <div className="card__media">
        <ImageWithFallback src={paket.foto} alt={`Foto paket ${paket.nama}`} />
      </div>
      <div className="card__body">
        <h3>{paket.nama}</h3>
        <p className="price">
          <Tag size={18} aria-hidden="true" />
          {formatRupiah(paket.harga)}
        </p>
        <p className="meta-row">
          <Users size={16} aria-hidden="true" />
          Kapasitas: {paket.kapasitas} tamu
        </p>
        <p>{paket.deskripsi_singkat}</p>
        <Link to={`/paket/${paket.slug}`} className="btn btn--primary">
          Lihat Detail Lengkap
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
