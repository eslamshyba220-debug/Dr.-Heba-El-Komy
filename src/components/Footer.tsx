import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { HeartPulse, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = CONTENT[lang].footer;
  const nav = CONTENT[lang].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#112525] text-white pt-16 pb-28 lg:pb-16 border-t border-[#70B0B0]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10 text-start">
          
          {/* Brand & Specialty (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#70B0B0]" />
              <span className="text-2xl font-bold tracking-tight text-white">
                {t.doctorName}
              </span>
            </div>
            
            <p className="text-xs text-[#70B0B0] font-semibold tracking-wide">
              {t.title}
            </p>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              {t.bio}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#70B0B0]">
              {t.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <a href="#home" className="hover:text-[#70B0B0] transition-colors">{nav.home}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#70B0B0] transition-colors">{nav.about}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#70B0B0] transition-colors">{nav.services}</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#70B0B0] transition-colors">{nav.journey}</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#70B0B0] transition-colors">{nav.gallery}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#70B0B0] transition-colors">{nav.faq}</a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#70B0B0]">
              {t.contactTitle}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-white/80">
              <p>{lang === 'ar' ? '٥٠٥ طريق الحرية، الوزارة، بولكلي، محافظة الإسكندرية' : '505 El-Horreya Road, Al-Wizara, Bolkly, Alexandria'}</p>
              <p>
                <a href="tel:+201556400998" className="hover:text-[#70B0B0] transition-colors">
                  {lang === 'ar' ? '01556400998' : '+20 155 640 0998'}
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/201556400998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#70B0B0] hover:underline"
                >
                  {lang === 'ar' ? 'مراسلة العيادة عبر واتساب' : 'Message Clinic on WhatsApp'}
                </a>
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#70B0B0]" />
              <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
            </button>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center md:text-start">
          <p className="max-w-xl leading-relaxed">
            {t.disclaimer}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:justify-start">
            <span>{t.copyright}</span>
            <span aria-hidden="true">•</span>
            <a
              href="https://www.dealsorigin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold tracking-wide text-[#70B0B0] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70B0B0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#112525] rounded-sm"
            >
              DEALS ORIGIN
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
