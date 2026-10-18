import { Heart, MessageCircle, MapPin } from 'lucide-react';

export default function Footer({ kontak }) {
  return (
    <footer className="site-footer">
      <div className="container grid gap-5 md:grid-cols-2">
        <div className="grid gap-3">
          <p className="inline-flex items-center gap-2 font-bold text-base m-0">
            <Heart size={18} aria-hidden="true" />
            Karro Wedding Organizer
          </p>
          <p className="m-0 opacity-80">Mewujudkan pernikahan impian bersama tim profesional.</p>
        </div>
        <div className="grid gap-2 md:justify-items-end text-sm">
          {kontak?.no_wa_admin && (
            <p className="inline-flex items-center gap-2 m-0">
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp: {kontak.no_wa_admin}
            </p>
          )}
          {kontak?.info_kontak && (
            <p className="inline-flex items-center gap-2 m-0">
              <MapPin size={16} aria-hidden="true" />
              {kontak.info_kontak}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
