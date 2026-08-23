import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';

interface PrinciplesProps {
  lang: Language;
}

export const Principles: React.FC<PrinciplesProps> = ({ lang }) => {
  const t = CONTENT[lang].principles;

  return (
    <section id="principles" className="py-24 lg:py-32 bg-[#FAF9F6] relative border-t border-b border-[#183333]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Number & Eyebrow */}
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-4xl sm:text-6xl font-extralight text-[#70B0B0] tracking-tighter">
            {t.sectionNumber}
          </span>
          <div className="space-y-0.5">
            <span className="text-xs uppercase tracking-widest text-[#70B0B0] font-semibold">
              {t.sectionTag}
            </span>
            <div className="text-xs text-[#667575]">
              {lang === 'ar' ? 'ركائز العمل الجراحي الطبي' : 'Foundations of Clinical Excellence'}
            </div>
          </div>
        </div>

        {/* Visual Statement - Large Typography Headline */}
        <div className="max-w-4xl space-y-4 mb-20 text-start">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#183333] tracking-tight leading-[1.1]">
            {t.mainHeadline}
          </h2>
          <p className="text-lg sm:text-xl text-[#667575] font-normal max-w-2xl leading-relaxed">
            {t.subHeadline}
          </p>
        </div>

        {/* 4 Horizontal Principles with Minimal Borders (NO HEAVY CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-start">
          {t.items.map((item, index) => (
            <div
              key={index}
              id={`principle-item-${index}`}
              className="space-y-4 pt-6 border-t-2 border-[#70B0B0]/40 transition-all duration-300 hover:border-[#70B0B0]"
            >
              {/* Number */}
              <div className="text-2xl font-light text-[#70B0B0] tracking-widest">
                {item.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#183333] tracking-tight leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#667575] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
