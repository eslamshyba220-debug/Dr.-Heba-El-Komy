import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { CONTENT } from '../data/content';
import { Maximize2, X, Sparkles, Building, Stethoscope } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = CONTENT[lang].gallery;
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = t.items;
  const heroItem = items[0];
  const doctorItem = items[1];
  const techItem = items[2];

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-[#183333]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
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

        {/* Editorial Asymmetrical Visual Composition (NO STANDARD CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Visual Anchor (7 cols) */}
          {heroItem && (
            <div
              id={`gallery-hero-${heroItem.id}`}
              onClick={() => setSelectedItem(heroItem)}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(24,51,51,0.08)] border border-[#183333]/10 bg-black"
            >
              <img
                src={heroItem.imageSrc}
                alt={heroItem.altText}
                width={1920}
                height={1080}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-[480px] object-cover object-center transform group-hover:scale-103 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#183333]/90 via-[#183333]/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full text-[#183333] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-[#70B0B0]" />
              </div>

              <div className="absolute bottom-6 inset-x-6 text-white text-start">
                <span className="inline-block px-3 py-1 rounded-md bg-[#70B0B0] text-[11px] font-semibold tracking-wider uppercase mb-2">
                  {heroItem.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {heroItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-lg font-light">
                  {heroItem.description}
                </p>
              </div>
            </div>
          )}

          {/* Right Supporting Asymmetrical Visuals (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Supporting Image 1 */}
            {doctorItem && (
              <div
                id={`gallery-item-${doctorItem.id}`}
                onClick={() => setSelectedItem(doctorItem)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(24,51,51,0.06)] border border-[#183333]/10 bg-black"
              >
                <img
                  src={doctorItem.imageSrc}
                  alt={doctorItem.altText}
                  width={1920}
                  height={1080}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover object-top transform group-hover:scale-103 transition-transform duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183333]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 inset-x-4 text-white text-start">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#70B0B0]/90 text-[10px] font-bold tracking-wider uppercase mb-1">
                    {doctorItem.category}
                  </span>
                  <h4 className="text-base font-bold text-white">{doctorItem.title}</h4>
                </div>
              </div>
            )}

            {/* Supporting Image 2 */}
            {techItem && (
              <div
                id={`gallery-item-${techItem.id}`}
                onClick={() => setSelectedItem(techItem)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(24,51,51,0.06)] border border-[#183333]/10 bg-black"
              >
                <img
                  src={techItem.imageSrc}
                  alt={techItem.altText}
                  width={1920}
                  height={1080}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover object-center transform group-hover:scale-103 transition-transform duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183333]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 inset-x-4 text-white text-start">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#70B0B0]/90 text-[10px] font-bold tracking-wider uppercase mb-1">
                    {techItem.category}
                  </span>
                  <h4 className="text-base font-bold text-white">{techItem.title}</h4>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#112525]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#183333] rounded-2xl overflow-hidden border border-[#70B0B0]/30 shadow-2xl text-start"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedItem.imageSrc}
              alt={selectedItem.altText}
              width={1920}
              height={1080}
              referrerPolicy="no-referrer"
              className="w-full max-h-[65vh] object-cover object-center"
            />

            <div className="p-6 text-white space-y-2 bg-[#183333]">
              <span className="inline-block px-3 py-1 rounded bg-[#70B0B0] text-xs font-semibold">
                {selectedItem.category}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
