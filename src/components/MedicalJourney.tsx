import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';

interface MedicalJourneyProps {
  lang: Language;
}

export const MedicalJourney: React.FC<MedicalJourneyProps> = ({ lang }) => {
  const t = CONTENT[lang].journey;

  return (
    <section id="journey" data-reveal className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Number */}
        <div className="flex items-baseline gap-4 mb-16 border-b border-[#183333]/10 pb-6">
          <span className="text-4xl sm:text-6xl font-extralight text-[#70B0B0] tracking-tighter">
            {t.sectionNumber}
          </span>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#70B0B0] font-semibold">
              {t.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#183333]">
              {t.headline}
            </h2>
          </div>
        </div>

        {/* Section Subtitle */}
        <div className="max-w-2xl mb-16 text-start">
          <p className="text-lg text-[#667575] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline (NO CARDS - Pure Typography & Connectors) */}
        <div className="relative">
          
          {/* Continuous Connecting Line for Desktop */}
          <div data-reveal="fade" className="journey-line hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#70B0B0]/30 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 text-start">
            {t.steps.map((step, index) => (
              <div
                key={index}
                id={`journey-step-${index}`}
                data-reveal
                style={{ '--reveal-delay': `${index * 110}ms` } as React.CSSProperties}
                className="relative flex flex-col space-y-4 group"
              >
                {/* Step Indicator Dot & Number */}
                <div className="flex items-center gap-4 lg:block">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#70B0B0] flex items-center justify-center text-lg font-bold text-[#70B0B0] group-hover:bg-[#70B0B0] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                    {step.number}
                  </div>
                  
                  {step.duration && (
                    <span className="lg:hidden text-xs text-[#70B0B0] font-semibold bg-[#F4FAF9] px-2.5 py-1 rounded-md">
                      {step.duration}
                    </span>
                  )}
                </div>

                {/* Duration Badge for Desktop */}
                {step.duration && (
                  <span className="hidden lg:inline-block text-[11px] font-semibold text-[#70B0B0] tracking-wide uppercase">
                    {step.duration}
                  </span>
                )}

                {/* Step Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#183333] tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-[#70B0B0]">
                    {step.subtitle}
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-sm text-[#667575] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
