import React from 'react';
import { Language } from '../types';
import { CONTENT, CLINIC_SUITE_URL } from '../data/content';
import { CheckCircle2, HeartPulse, UserCheck, Stethoscope, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].about;

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle background divider line */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Large Editorial Number */}
        <div className="flex items-baseline gap-4 mb-12 border-b border-[#183333]/10 pb-6">
          <span className="text-4xl sm:text-6xl font-extralight text-[#70B0B0] tracking-tighter">
            {t.sectionNumber}
          </span>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#70B0B0] font-semibold">
              {t.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#183333]">
              {lang === 'ar' ? 'عن الدكتورة هبة الكومي' : 'About Dr. Heba El-Komy'}
            </h2>
          </div>
        </div>

        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left / Typography Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-start">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183333] leading-tight">
              {t.headline}
            </h3>

            <div className="space-y-5 text-base sm:text-lg text-[#667575] leading-relaxed font-normal">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>

            {/* Editorial Philosophy Bullet Points */}
            <div className="pt-4 space-y-4">
              <h4 className="text-sm uppercase tracking-wider font-bold text-[#183333] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#70B0B0]" />
                <span>{t.philosophyTitle}</span>
              </h4>
              <div className="space-y-3">
                {t.philosophyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#70B0B0] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#183333]/90 leading-normal">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Large Stats Indicator Bar - Minimalist Line Display */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#183333]/10">
              {t.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#70B0B0] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#667575] font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Overlapping Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Asymmetric Outer Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#70B0B0]/30 shadow-[0_20px_40px_rgba(24,51,51,0.06)] bg-white">
                <img
                  src={CLINIC_SUITE_URL}
                  alt={lang === 'ar' ? 'عيادة د. هبة الكومي التخصصية' : 'Dr. Heba El-Komy Consultation Suite'}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-103 transition-transform duration-500"
                />
                
                <div className="p-6 bg-white space-y-2 border-t border-[#70B0B0]/15 text-start">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#70B0B0] uppercase tracking-wider">
                    <Stethoscope className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'الخصوصية والرعاية الفائقة' : 'Privacy & Bespoke Care'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#667575] leading-relaxed">
                    {lang === 'ar'
                      ? 'عيادة مجهزة بأحدث أدوات الفحص الدقيق لضمان راحة وخصوصية المرضى التامة في كافة التخصصات.'
                      : 'Equipped with cutting-edge clinical tools to ensure utmost comfort and confidentiality.'}
                  </p>
                </div>
              </div>

              {/* Overlapping Floating Quote Stamp */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 sm:-right-8 bg-[#183333] text-white p-5 rounded-xl max-w-xs shadow-xl border border-[#70B0B0]/30 text-start">
                <div className="flex items-center gap-2 mb-2 text-[#70B0B0]">
                  <HeartPulse className="w-4 h-4" />
                  <span className="text-[11px] font-bold tracking-widest uppercase">
                    {lang === 'ar' ? 'ميثاق الشرف الطبي' : 'Clinical Pledge'}
                  </span>
                </div>
                <p className="text-xs text-white/90 italic leading-relaxed">
                  {lang === 'ar'
                    ? '"صحة وراحة المريض هي غايتنا الأولى دائماً، والدقة الجراحية أساس نجاح كل خطوة."'
                    : '"Patient wellness and dignity are our utmost priorities; surgical precision guides every step."'}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
