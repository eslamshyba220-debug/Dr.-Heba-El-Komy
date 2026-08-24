import React, { useState } from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Plus } from 'lucide-react';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" data-reveal className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
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

        {/* Subtitle */}
        <div className="max-w-2xl mb-12 text-start">
          <p className="text-lg text-[#667575] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Minimalist FAQ Accordion (NO CARDS - Pure Thin Separators) */}
        <div className="border-t border-[#183333]/15">
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                data-reveal
                style={{ '--reveal-delay': `${index * 55}ms` } as React.CSSProperties}
                className="border-b border-[#183333]/10 transition-colors"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full py-7 px-2 flex items-center justify-between gap-6 text-start select-none group focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg sm:text-xl font-bold transition-colors ${
                      isOpen ? 'text-[#70B0B0]' : 'text-[#183333] group-hover:text-[#70B0B0]'
                    }`}
                  >
                    {item.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                      isOpen
                        ? 'bg-[#70B0B0] text-white border-[#70B0B0]'
                        : 'border-[#183333]/20 text-[#183333] group-hover:border-[#70B0B0] group-hover:text-[#70B0B0]'
                    }`}
                  >
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </div>
                </button>

                <div className={`faq-answer-grid ${isOpen ? 'faq-answer-grid--open' : ''}`} aria-hidden={!isOpen}>
                  <div className="overflow-hidden">
                    <div className="px-2 pb-8 pt-1 text-start">
                    <p className="text-base sm:text-lg text-[#667575] leading-relaxed max-w-4xl font-normal">
                      {item.answer}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
