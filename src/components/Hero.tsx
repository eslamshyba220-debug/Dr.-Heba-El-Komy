import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Calendar, Phone, Award, ShieldCheck, Sparkles, ArrowLeft, ArrowRight, Activity, ChevronRight, ChevronLeft } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onBookClick }) => {
  const t = CONTENT[lang].hero;
  const isRtl = lang === 'ar';

  const bottomRailItems = [
    { number: '01', title: lang === 'ar' ? 'جراحات السمنة والكبسولة الذكية' : 'Bariatric Surgery & Smart Capsule', target: '#services' },
    { number: '02', title: lang === 'ar' ? 'جراحات المناظير' : 'Laparoscopic Surgery', target: '#services' },
    { number: '03', title: lang === 'ar' ? 'الجراحة العامة' : 'General Surgery', target: '#services' },
    { number: '04', title: lang === 'ar' ? 'جراحة البواسير بالليزر' : 'Laser Hemorrhoid Surgery', target: '#services' },
  ];

  return (
    <div className="hero-stage bg-[#FAF9F6] border-b border-[#70B0B0]/20">
      <section
        id="home"
        className="relative min-h-[85vh] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-start relative">
              {/* Watermark Section Number */}
              <div data-reveal="fade" style={{ '--reveal-delay': '180ms' } as React.CSSProperties} className="absolute top-0 end-4 sm:end-12 text-[100px] sm:text-[140px] font-black text-[#70B0B0]/5 select-none pointer-events-none -z-10">
                01
              </div>

              <div className="mb-4">
                {/* Eyebrow badge */}
                <span data-reveal style={{ '--reveal-delay': '280ms' } as React.CSSProperties} className="inline-block bg-[#F4FAF9] text-[#70B0B0] border border-[#70B0B0]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 rounded-md">
                  {lang === 'ar' ? 'استشاري الجراحة العامة والمناظير' : 'Consultant General & Laparoscopic Surgery'}
                </span>

                {/* Grand Editorial Headline */}
                <h1 data-reveal style={{ '--reveal-delay': '380ms' } as React.CSSProperties} className="text-4xl sm:text-6xl lg:text-[72px] leading-[1.08] font-bold mb-6 tracking-tight text-[#173333]">
                  {lang === 'ar' ? (
                    <>
                      دقة الجراحة، <br />
                      <span className="text-[#70B0B0]">بروح إنسانية.</span>
                    </>
                  ) : (
                    <>
                      Surgical Precision, <br />
                      <span className="text-[#70B0B0]">Human Compassion.</span>
                    </>
                  )}
                </h1>

                {/* Editorial Description */}
                <p data-reveal style={{ '--reveal-delay': '500ms' } as React.CSSProperties} className="text-base sm:text-lg text-[#667575] max-w-md lg:max-w-lg leading-relaxed mb-8 sm:mb-10 font-normal">
                  {t.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div data-reveal style={{ '--reveal-delay': '610ms' } as React.CSSProperties} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Primary Button */}
                <button
                  id="hero-primary-book-btn"
                  onClick={onBookClick}
                  className="premium-cta flex items-center justify-center gap-4 bg-[#183333] hover:bg-[#70B0B0] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[12px] group transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span className="text-base font-bold">
                    {lang === 'ar' ? 'ابدأ رحلة علاجك' : 'Start Your Journey'}
                  </span>
                  {isRtl ? (
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                {/* Secondary Underlined Button */}
                <a
                  id="hero-secondary-link"
                  href="#journey"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 text-[#173333] font-bold underline underline-offset-8 decoration-[#70B0B0] decoration-2 hover:text-[#70B0B0] transition-colors text-center cursor-pointer"
                >
                  {lang === 'ar' ? 'شاهد خطوات الرعاية' : 'Explore Patient Care'}
                </a>
              </div>

              {/* Trust Indicators */}
              <div data-reveal style={{ '--reveal-delay': '700ms' } as React.CSSProperties} className="pt-8 mt-8 border-t border-[#70B0B0]/15 flex flex-wrap items-center gap-6 text-xs text-[#667575]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#70B0B0] animate-pulse" />
                  <span>{lang === 'ar' ? 'مواعيد الاستشارة متاحة هذا الأسبوع' : 'Consultations available this week'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#70B0B0]" />
                  <span>{lang === 'ar' ? 'رعاية جراحية متخصصة ومتابعة مباشرة' : 'Direct surgeon follow-up'}</span>
                </div>
              </div>
            </div>

            {/* Right Column / Editorial Portrait Arch (5 cols) */}
            <div data-reveal="scale" style={{ '--reveal-delay': '140ms' } as React.CSSProperties} className="lg:col-span-5 relative bg-[#F4FAF9] rounded-[2.5rem] p-6 sm:p-8 overflow-visible border border-[#70B0B0]/20">
              
              {/* Concentric Geometry Overlays */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white rounded-full opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-[#70B0B0]/10 rounded-tl-[200px]"></div>
              </div>

              {/* Natural rectangular portrait frame */}
              <div className="relative z-10 w-full flex items-end justify-center">
                <div className="hero-image-mask w-[90%] sm:w-[88%] overflow-hidden rounded-xl border border-white/60 bg-white shadow-xl">
                  <img
                    id="hero-doctor-portrait"
                    src="/1.jpg"
                    alt={lang === 'ar' ? 'دكتورة هبة الكومي - استشاري الجراحة العامة والمناظير' : 'Dr. Heba El-Komy'}
                    width={1122}
                    height={1410}
                    loading="eager"
                    fetchPriority="high"
                    className="hero-portrait block w-full aspect-[4/5] object-cover object-top transform hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div data-reveal style={{ '--reveal-delay': '660ms' } as React.CSSProperties} className="absolute -bottom-6 -start-2 sm:-start-6 bg-white p-5 sm:p-6 shadow-2xl shadow-[#70B0B0]/20 rounded-2xl z-20 w-56 sm:w-60 border border-[#70B0B0]/20 text-start">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4FAF9] flex items-center justify-center text-[#70B0B0] shrink-0">
                    <Award className="w-5 h-5 text-[#70B0B0]" />
                  </div>
                  <div className="text-sm font-bold leading-tight text-[#173333]">
                    {lang === 'ar' ? 'خبرة معتمدة' : 'Certified Expertise'}
                    <br />
                    <span className="text-xs font-normal text-[#667575]">
                      {lang === 'ar' ? '+١٥ عاماً من العطاء' : '+15 Years Excellence'}
                    </span>
                  </div>
                </div>
                <div className="h-[1px] bg-[#70B0B0]/15 w-full"></div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom Service Rail (Editorial ticker) */}
      <nav
        aria-label={lang === 'ar' ? 'قائمة التخصصات السريعة' : 'Quick procedure index'}
        className="bg-white border-t border-[#70B0B0]/20 grid grid-cols-2 lg:grid-cols-4 items-center divide-y lg:divide-y-0 divide-x divide-x-reverse divide-[#70B0B0]/15 overflow-hidden"
      >
        {bottomRailItems.map((item, idx) => (
          <a
            key={idx}
            href={item.target}
            data-reveal
            style={{ '--reveal-delay': `${idx * 70}ms` } as React.CSSProperties}
            className="min-w-0 py-5 px-4 sm:px-8 flex items-center justify-between gap-2 group hover:bg-[#F4FAF9] transition-all duration-200"
          >
            <div className="min-w-0 flex flex-col text-start">
              <span className="text-[11px] text-[#70B0B0] font-bold tracking-widest">{item.number}</span>
              <span className="text-xs sm:text-sm font-bold leading-snug text-[#173333] group-hover:text-[#70B0B0] transition-colors break-words">{item.title}</span>
            </div>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 text-[#70B0B0] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#70B0B0] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
            )}
          </a>
        ))}
      </nav>
    </div>
  );
};
