import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

interface MobileActionsProps {
  lang: Language;
  onBookClick: () => void;
}

export const MobileActions: React.FC<MobileActionsProps> = ({ lang, onBookClick }) => {
  const t = CONTENT[lang].nav;

  return (
    <aside
      aria-label={lang === 'ar' ? 'أزرار التواصل السريع' : 'Quick contact actions'}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#183333]/15 px-4 py-2.5 shadow-[0_-4px_20px_rgba(24,51,51,0.08)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        
        {/* Call Now */}
        <a
          id="mobile-action-call"
          href="tel:+201556400998"
          className="premium-cta flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white border border-[#183333]/15 text-[#183333] hover:bg-black/5 transition-colors text-center"
        >
          <Phone className="w-4 h-4 text-[#70B0B0] mb-0.5" />
          <span className="text-[11px] font-semibold">{t.callNow}</span>
        </a>

        {/* WhatsApp */}
        <a
          id="mobile-action-whatsapp"
          href={`https://wa.me/201556400998?text=${encodeURIComponent(
            lang === 'ar' ? 'مرحباً د. هبة الكومي، أود الاستفسار عن موعد كشف في العيادة.' : 'Hello Dr. Heba El-Komy, I would like to inquire about an appointment.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-cta flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white border border-[#183333]/15 text-[#183333] hover:bg-black/5 transition-colors text-center"
        >
          <MessageSquare className="w-4 h-4 text-[#70B0B0] mb-0.5" />
          <span className="text-[11px] font-semibold">{t.whatsapp}</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          id="mobile-action-book"
          onClick={onBookClick}
          className="premium-cta flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#70B0B0] text-white hover:bg-[#5FA1A1] transition-colors text-center cursor-pointer shadow-xs"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-semibold">{t.bookNow}</span>
        </button>

      </div>
    </aside>
  );
};
