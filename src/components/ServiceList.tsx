import React, { useState } from 'react';
import { Language, ServiceItem } from '../types';
import { CONTENT } from '../data/content';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldCheck, ChevronDown, ChevronUp, Calendar, MessageSquare } from 'lucide-react';

interface ServiceListProps {
  lang: Language;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ lang, onSelectServiceForBooking }) => {
  const t = CONTENT[lang].services;
  const isRtl = lang === 'ar';
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-white relative">
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

        {/* Section Intro Subtitle */}
        <div className="max-w-2xl mb-12 text-start">
          <p className="text-lg text-[#667575] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Editorial Service Rows (NO CARDS - Minimalist List) */}
        <div className="border-t border-[#183333]/15">
          {t.items.map((service) => {
            const isExpanded = expandedId === service.id;
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                id={`service-row-${service.id}`}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`border-b border-[#183333]/10 transition-all duration-300 ${
                  isExpanded ? 'bg-[#FAFDFC]' : isHovered ? 'bg-[#FAF9F6]' : 'bg-transparent'
                }`}
              >
                {/* Main Interactive Service Row */}
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="py-7 sm:py-9 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 cursor-pointer select-none group"
                >
                  {/* Left: Number + Title + Subtitle */}
                  <div className="flex items-start md:items-center gap-6 sm:gap-8 text-start flex-1">
                    <span
                      className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors duration-200 shrink-0 ${
                        isExpanded || isHovered ? 'text-[#70B0B0] font-semibold' : 'text-[#183333]/40'
                      }`}
                    >
                      {service.number}
                    </span>

                    <div className="space-y-1">
                      <h3
                        className={`text-xl sm:text-2xl font-bold transition-all duration-200 ${
                          isExpanded || isHovered ? 'text-[#183333] translate-x-1' : 'text-[#183333]'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#667575] font-normal">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Short Indicator / Action Arrow */}
                  <div className="flex items-center gap-4 self-end md:self-center">
                    <span className="hidden sm:inline-block text-xs font-medium text-[#70B0B0]">
                      {isExpanded ? t.hideDetails : t.viewDetails}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                        isExpanded
                          ? 'bg-[#70B0B0] text-white border-[#70B0B0]'
                          : isHovered
                          ? 'bg-[#70B0B0]/15 text-[#70B0B0] border-[#70B0B0]/40'
                          : 'border-[#183333]/15 text-[#183333]/60 bg-white'
                      }`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : isRtl ? (
                        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Medical Details */}
                {isExpanded && (
                  <div className="px-6 sm:px-12 pb-10 pt-2 animate-in fade-in-50 duration-300 text-start border-t border-[#70B0B0]/15">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                      
                      {/* Detailed Description (7 cols) */}
                      <div className="lg:col-span-7 space-y-6">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#70B0B0] font-bold mb-2">
                            {lang === 'ar' ? 'الوصف الجراحي للإجراء' : 'Clinical Procedure Overview'}
                          </h4>
                          <p className="text-base text-[#183333]/90 leading-relaxed">
                            {service.fullDesc}
                          </p>
                        </div>

                        {/* Indications */}
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#183333] font-bold mb-3">
                            {lang === 'ar' ? 'دواعي إجراء العملية والحالات المرشحة:' : 'Clinical Indications & Candidates:'}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.indications.map((ind, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#667575]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#70B0B0] mt-2 shrink-0" />
                                <span>{ind}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Advantages */}
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#183333] font-bold mb-3">
                            {lang === 'ar' ? 'أبرز مميزات التقنية:' : 'Key Procedure Advantages:'}
                          </h4>
                          <div className="space-y-2">
                            {service.features.map((feat, i) => (
                              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#183333]">
                                <CheckCircle2 className="w-4 h-4 text-[#70B0B0] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quick Meta Details & Service Booking CTA (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 p-6 rounded-xl bg-[#FAF9F6] border border-[#183333]/10">
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-[#70B0B0] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs text-[#667575] block">
                                {lang === 'ar' ? 'فترة النقاهة المتوقعة' : 'Estimated Recovery Time'}
                              </span>
                              <span className="text-sm font-semibold text-[#183333]">
                                {service.recoveryTime}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#70B0B0] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs text-[#667575] block">
                                {lang === 'ar' ? 'نوع التخدير المتبع' : 'Anesthesia Protocol'}
                              </span>
                              <span className="text-sm font-semibold text-[#183333]">
                                {service.anesthesiaType}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CTA button to jump directly to booking for this specific procedure */}
                        <div className="pt-4 border-t border-[#183333]/10 space-y-2.5">
                          <button
                            id={`book-service-btn-${service.id}`}
                            onClick={() => onSelectServiceForBooking(service.id)}
                            className="w-full flex items-center justify-center gap-2 bg-[#70B0B0] hover:bg-[#5FA1A1] text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors cursor-pointer"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>{t.bookThisService}</span>
                          </button>

                          <a
                            id={`whatsapp-service-btn-${service.id}`}
                            href={`https://wa.me/201556400998?text=${encodeURIComponent(
                              lang === 'ar'
                                ? `مرحباً د. هبة الكومي، أود الاستفسار عن تفاصيل: ${service.title}`
                                : `Hello Dr. Heba El-Komy, I would like to inquire about: ${service.title}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-white/80 border border-[#183333]/15 text-[#183333] py-2.5 px-4 rounded-xl text-xs font-medium transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 text-[#70B0B0]" />
                            <span>{lang === 'ar' ? 'استشارة سريعة عبر واتساب' : 'Quick Inquiry via WhatsApp'}</span>
                          </a>
                        </div>

                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
